const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");
const SpaceAvailabilitySchema = require("../models/SpaceAvailabilityModel");
const cosmetologistSchema = require("../models/CosmetologistModel");
const ApointmentService = require("./ApointmentService");
const response = require("../helpers/responses");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
const { default: mongoose } = require("mongoose");
const { log } = require("console");
moment.tz.setDefault(process.env.TZ);

async function findCosmetologistByTreatment(req, res) {
  try {
    //pass array of treatment
    const { treatment } = req.body;
    const BusinessUnit = await businessUnitSchema
      .find({
        treatment: { $in: treatment },
      })
      .select({ _id: 1 });

    if (BusinessUnit.length === 0) {
      return response.sendNotFound(res);
    }
    const businessUnitIds = BusinessUnit.map((unit) => unit._id);

    const Cosmetologist = await cosmetologistSchema
      .find({
        businessUnit: { $in: businessUnitIds },
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
      return response.sendNotFound(res);
    }
    if (Cosmetologist) {
      return response.sendCoustom(
        res,
        Cosmetologist,
        false,
        "Cosmetologists that can do this treatment(s): " +
          businessUnitIds.length,
        200
      );
    }
  } catch (error) {
    response.sendError(res, error.message);
  }
}

async function getAvailableDates(req, res) {
  try {
    const { _id } = req.body;

    const cosmetologist = await cosmetologistSchema.findById(_id);

    if (!cosmetologist) {
      throw new Error("Cosmetologist not found");
    }

    const workdays = Object.keys(cosmetologist.workdays).filter(
      (day) => cosmetologist.workdays[day]
    );

    //generate a list of workdays
    const startDate = moment().startOf("day").add(1, "days").toDate();
    const endDate = moment().add(182, "days").endOf("day").toDate();

    // generate dates for workdays
    const AvailableDates = [];
    let currentDate = moment(startDate).startOf("day");
    while (currentDate.isSameOrBefore(endDate, "day")) {
      if (workdays.includes(currentDate.format("dddd").toLowerCase())) {
        const dateFormated = currentDate.format("DD-MM-YYYY");
        AvailableDates.push(dateFormated);
      }
      currentDate.add(1, "day");
    }

    const scheduledAppointments = await apoitmentSch
      .find({
        cosmetologist: _id,
      })
      .select({ date: 1, _id: 0 });

    //verificar que fechas tienen todas los espacios llenos PENDIENTE

    // Convertir las fechas de las citas al formato "DD-MM-YYYY"
    const scheduledAppointmentsFormated = scheduledAppointments.map((cita) => {
      const dateFormated = moment(cita.date).format("DD-MM-YYYY");
      return dateFormated;
    });

    // Filtrar las fechas disponibles eliminando las fechas con citas existentes
    const datesFiltered = AvailableDates.filter((fecha) => {
      return !scheduledAppointmentsFormated.includes(fecha);
    });

    return response.sendCoustom(
      res,
      datesFiltered,
      true,
      "Available Dates in next 6 Months",
      200
    );
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function getAvailableSpaces(req, res) {
  try {
    const { cosmetologist, date } = req.body;
    const validDate = moment(date, "DD-MM-YYYY").toDate();
    if (moment(validDate).isBefore()) {
      return response.sendError(
        res,
        "Date has passed please choose another date"
      );
    }
    const Cosmetologist = await cosmetologistSchema
      .findById({
        _id: cosmetologist,
      })
      .select({ worktime: 1, _id: 0 });
    const { start, end } = Cosmetologist.worktime;

    if (!Cosmetologist) {
      throw new Error("Cosmetologist not found");
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
        throw new Error(
          "There are no spaces available for the given date. Please select another date."
        );
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

      return response.sendCoustom(
        res,
        {
          space_id: existingAvailability._id,
          avaibleSpaces: formattedAvailableSpaces,
        },
        true,
        "Date already exists, showing available spaces:",
        200
      );
    }

    const spaces = await SpaceAvailabilitySchema.calculateAndSaveAvailability(
      cosmetologist,
      validDate,
      workStartTime,
      workEndTime
    );

    if (!spaces) {
      throw new Error("Couldn't find space");
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
      blockId: block._id,
    }));

    return response.sendCoustom(
      res,
      {
        space_id: spaces._id,
        avaibleSpaces: formattedAvailableSpaces,
      },
      true,
      "Showing available spaces:",
      200
    );
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function createApointment(req, res) {
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

    // Validar si space_id existe en la base de datos
    const spaceExists = await SpaceAvailabilitySchema.exists({
      _id: spaceIdObject,
    });

    if (!spaceExists) {
      return response.sendNotFound(res, "Space not found");
    }
    // Busca la disponibilidad del espacio y bloque específico
    const spaceAvailability = await SpaceAvailabilitySchema.findOne({
      _id: spaceIdObject,
      "blockedTimes._id": blockIdObject,
    }).select({ _id: 1, blockedTimes: 1 });

    if (!spaceAvailability) {
      return response.sendNotFound(res);
    }
    // Verifica si el bloque ya está ocupado en la fecha seleccionada
    const block = spaceAvailability.blockedTimes.filter(
      (block) =>
        block._id.toString() === blockIdObject.toString() &&
        !block.isAvailable === false
      // block._id.toString() === blockIdObject.toString() && !block.isAvailable
    );
    
    if (!block || block.length === 0) {
      throw new Error("This space is not available");
    }
    // Actualiza el estado del bloque
    block[0].isAvailable = false;
    await spaceAvailability.save();

    // Crea la cita
    const reqData = {
      body: {
        date: formattedDate,
        description,
        cosmetologist,
        patient,
        treatment,
        startTime: block[0].startTime,
        endTime: block[0].endTime,
      },
    };

    const createdAppointment = await ApointmentService.create(reqData, res);

    if (createdAppointment) {
      return response.sendSuccess(res, createdAppointment);
    }
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

//actualizar estados de la citas PENDIENTE

module.exports = {
  findCosmetologistByTreatment,
  getAvailableDates,
  getAvailableSpaces,
  createApointment,
};
