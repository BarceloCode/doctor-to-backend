const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");
const SpaceAvailabilitySchema = require("../models/SpaceAvailabilityModel");
const cosmetologistSchema = require("../models/CosmetologistModel");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
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
    const endDate = moment().add(req.body.days, "days").endOf("day").toDate();

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
      message: "Available Dates in next " + req.body.days + " days:",
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
    const workStartTime = new Date("2023-09-15T10:00:00"); // Hora de inicio del trabajo
    const workEndTime = new Date("2023-09-15T22:00:00"); // Hora de fin del trabajo

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
          message: "There are no spaces available for the given date. pls select another date",
          status: 200,
        };
      }

      return {
        message: "Date already exists, showing available spaces:",
        status: 200,
        available: availableSpaces,
      };
    }

    // Si la disponibilidad no existe, calcular y guardar
    const spaces = await SpaceAvailabilitySchema.calculateAndSaveAvailability(
      cosmetologist,
      validDate,
      workStartTime,
      workEndTime
    );

    if (!spaces) {
      return { message: "Spaces not found", status: 404 };
    }

    // Mostrar solo los espacios disponibles
    const availableSpaces = spaces.blockedTimes.filter(
      (block) => block.isAvailable === true
    );

    return {
      message: "Available spaces: ",
      status: 200,
      availableSpaces: availableSpaces,
    };
  } catch (error) {
    return { message: "Error", error: error.message, status: 403 };
  }
}

module.exports = {
  findCosmetologistByTreatment,
  getAvailableDates,
  getAvailableSpaces,
};
