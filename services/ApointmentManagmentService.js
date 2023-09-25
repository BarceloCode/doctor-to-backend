const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");
const SpaceAvailabilitySchema = require("../models/SpaceAvailabilityModel");
const cosmetologistSchema = require("../models/CosmetologistModel");
const ApointmentService = require("./ApointmentService");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
const { default: mongoose } = require("mongoose");
moment.tz.setDefault(process.env.TZ);

async function findCosmetologistByTreatment(req) {
  try {
    //pasarle el array de los tratamientos.
    const BusinessUnit = await businessUnitSchema
      .find({
        treatment: { $in: req.body.treatment },
      })
      .select("_id");

    let lenght = BusinessUnit.length;
    if (lenght === 0) {
      return {
        message:
          "Cant find BusinessUnit that can do this treatment with IDs: '" +
          req.body.treatment +
          "'",
        status: 400,
      };
    }
    if (BusinessUnit) {
      const ids = [];

      BusinessUnit.forEach((element) => {
        const idString = element._id.toString();
        ids.push(idString);
      });
      const Cosmetologist = await cosmetologistSchema
        .find({
          businessUnit: { $in: ids },
        })
        .select("name worktime workdays businessUnit")
        .populate({
          path: "businessUnit",
          select: { name: 1, clinic: 1, treatment: 1 },
          populate: {
            path: "clinic treatment",
            select: {
              name: 1,
              treatmentName: 1,
              worktime: 1,
              workdays: 1,
              address: 1,
            },
          },
        });
      lenght = Cosmetologist.length;
      if (lenght === 0) {
        return {
          message:
            "Error cant find Cosmetologist with BusinesUnit with IDs: '" +
            ids +
            "'",
          status: 400,
        };
      }
      if (Cosmetologist) {
        return {
          message: "Cosmetologists that can do this treatment(s):" + ids.length,
          Cosmetologist: Cosmetologist,
          status: 200,
        };
      }
    }
  } catch (error) {
    return { message: error.message, status: 400 };
  }
}

async function getAvailableDates(req) {
  try {
    const { _id } = req.body;
    const startDate = moment().startOf("day").add(1, "days").toDate();
    const endDate = moment().add(182, "days").endOf("day").toDate();

    // Obtener la información del cosmetólogo, incluyendo sus días de trabajo
    const cosmetologist = await cosmetologistSchema.findById(_id);

    if (!cosmetologist) {
      throw new Error("Cosmetologist not found");
    }

    const workdays = Object.keys(cosmetologist.workdays).filter(
      (day) => cosmetologist.workdays[day]
    );

    // Calcular las fechas disponibles dentro del rango especificado
    const fechasDisponibles = [];
    let currentDate = moment(startDate).startOf("day");
    while (currentDate.isSameOrBefore(endDate, "day")) {
      if (workdays.includes(currentDate.format("dddd").toLowerCase())) {
        // Formatear la fecha en "DD-MM-YYYY"
        const fechaFormateada = currentDate.format("DD-MM-YYYY");
        fechasDisponibles.push(fechaFormateada);
      }
      currentDate.add(1, "day");
    }

    // Buscar las citas agendadas para el cosmetólogo
    const citasAgendadas = await apoitmentSch
      .find({
        cosmetologist: _id,
      })
      .select({ date: 1, _id: 0 });

    // Convertir las fechas de las citas al formato "DD-MM-YYYY"
    const citasAgendadasFormateadas = citasAgendadas.map((cita) => {
      const fechaFormateada = moment(cita.date).format("DD-MM-YYYY");
      return fechaFormateada;
    });

    // Filtrar las fechas disponibles eliminando las fechas con citas existentes
    const fechasDisponiblesFiltradas = fechasDisponibles.filter((fecha) => {
      return !citasAgendadasFormateadas.includes(fecha);
    });

    return {
      message: "Available Dates in next 6 Months",
      Avaible: fechasDisponiblesFiltradas,
      status: 200,
    };
  } catch (error) {
    return { message: "Error", error: error.message, status: 400 };
  }
}

async function getAvailableSpaces(req) {
  try {
    const { cosmetologist, date } = req.body;
    const validDate = moment(date, "DD-MM-YYYY").toDate();
    if (moment(validDate).isBefore()) {
      return {
        message: "Date has passed please choose another date",
        status: 400,
      };
    }
    const Cosmetologist = await cosmetologistSchema
      .findById({
        _id: cosmetologist,
      })
      .select({ worktime: 1, _id: 0 });
    const { start, end } = Cosmetologist.worktime;

    if (!Cosmetologist) {
      return { message: "Cosmetologist not found", status: 404 };
    }
    const workStartTime = moment(start).tz(process.env.TZ);
    const workEndTime = moment(end).tz(process.env.TZ);

    // Verificar si ya existe la disponibilidad para la fecha dada
    const existingAvailability = await SpaceAvailabilitySchema.findOne({
      date: validDate,
    });

    if (existingAvailability) {
      // La disponibilidad ya existe, mostrar solo los espacios disponibles
      const availableSpaces = existingAvailability.blockedTimes.filter(
        (block) => block.isAvailable === true
      );

      if (availableSpaces.length === 0) {
        return {
          message:
            "There are no spaces available for the given date. Please select another date.",
          status: 200,
        };
      }

      // Formatear las fechas en el time zone y formato especificado
      const formattedAvailableSpaces = availableSpaces.map((block) => ({
        startTime: moment(block.startTime)
          .tz(process.env.TZ)
          .format("HH:mm:ss A"),
        endTime: moment(block.endTime).tz(process.env.TZ).format("HH:mm:ss A"),
        isAvailable: block.isAvailable,
        blockId: block._id,
      }));

      return {
        message: "Date already exists, showing available spaces:",
        status: 200,
        total_spaces: availableSpaces.length,
        available: {
          date: req.body.date,
          _id: existingAvailability._id,
          spaces: formattedAvailableSpaces,
        },
      };
    }

    const spaces = await SpaceAvailabilitySchema.calculateAndSaveAvailability(
      cosmetologist,
      validDate,
      workStartTime,
      workEndTime
    );

    if (!spaces) {
      return { message: "Spaces not found", status: 404 };
    }

    const availableSpaces = spaces.blockedTimes.filter(
      (block) => block.isAvailable === true
    );

    const formattedAvailableSpaces = availableSpaces.map((block) => ({
      startTime: moment(block.startTime)
        .tz(process.env.TZ)
        .format("HH:mm:ss A"),
      endTime: moment(block.endTime).tz(process.env.TZ).format("HH:mm:ss A"),
      isAvailable: block.isAvailable,
      blockId: block._id, // Agregamos el ID aquí
    }));

    return {
      date: req.body.date,
      message: "Available spaces: ",
      status: 200,
      total_spaces: availableSpaces.length,
      availableSpaces: { _id: spaces._id, spaces: formattedAvailableSpaces },
    };
  } catch (error) {
    return { message: "Error", error: error.message, status: 403 };
  }
}

async function createApointment(req) {
  try {
    const {
      space_id,
      blockId,
      date,
      description,
      cosmetologist,
      patient,
      treatment,
    } = req.body;

    // Convierte las cadenas space_id y blockId en objetos ObjectId
    const spaceIdObject = mongoose.Types.ObjectId(space_id);
    const blockIdObject = mongoose.Types.ObjectId(blockId);
    const formattedDate = moment(date, "DD-MM-YYYY").toDate();

    // Busca la disponibilidad del espacio y bloque específico
    const spaceAvailability = await SpaceAvailabilitySchema.findOne({
      _id: spaceIdObject,
      "blockedTimes._id": blockIdObject,
    }).select({ _id: 1, blockedTimes: { $elemMatch: { _id: blockIdObject } } });

    if (!spaceAvailability) {
      return { message: "Space availability not found", status: 404 };
    }

    // Valida si la fecha y bloque ya están ocupados
    const CheckAvailability = await SpaceAvailabilitySchema.findOne({
      _id: spaceIdObject,
      date: formattedDate,
      "blockedTimes._id": blockIdObject,
    });

    const filterByBlockId = CheckAvailability.blockedTimes.filter(
      (data) =>
        data._id == blockIdObject.toString() && data.isAvailable === false
    );

    if (filterByBlockId.length === 0) {
      // Actualiza el estado del bloque
      spaceAvailability.blockedTimes[0].isAvailable = false;
      await spaceAvailability.save();

      // Llama a la función para crear la cita
      const reqData = {
        body: {
          date: formattedDate,
          description,
          cosmetologist,
          patient,
          treatment,
          startTime: spaceAvailability.blockedTimes[0].startTime,
          endTime: spaceAvailability.blockedTimes[0].endTime,
        },
      };

      const createApointment = await ApointmentService.create(reqData);

      if (createApointment) {
        return {
          message: "Appointment scheduled successfully",
          status: 200,
          appointment: createApointment,
        };
      }
    }

    if (CheckAvailability) {
      return {
        message: "This space has already been taken",
        status: 400,
        blockId: CheckAvailability.blockedTimes[0]._id,
        isAvailable: CheckAvailability.blockedTimes[0].isAvailable,
      };
    }
  } catch (error) {
    return { message: "Error", error: error.message, status: 403 };
  }
}

module.exports = {
  findCosmetologistByTreatment,
  getAvailableDates,
  getAvailableSpaces,
  createApointment,
};
