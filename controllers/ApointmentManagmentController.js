const ApointmentMgnmtService = require("../services/ApointmentManagmentService");

async function findCosmetologistByTreatment(req, res) {
  try {
    const Apointment =
      await ApointmentMgnmtService.findCosmetologistByTreatment(req, res);
    res.status(Apointment.status).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvaibleApointmentDates(req, res) {
  try {
    const AvaibleApointmentDates =
      await ApointmentMgnmtService.getAvailableDates(req);
    res.status(AvaibleApointmentDates.status).json(AvaibleApointmentDates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvailableSpaces(req, res) {
  try {
    const available = await ApointmentMgnmtService.getAvailableSpaces(req);
    res.status(available.status).json(available);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createApointment(req, res) {
  try {
    const createApointment = await ApointmentMgnmtService.createApointment(req);
    res.status(createApointment.status).json(createApointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  findCosmetologistByTreatment,
  getAvaibleApointmentDates,
  getAvailableSpaces,
  createApointment,
};
