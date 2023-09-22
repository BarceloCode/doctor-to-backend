const ApointmentMgnmtService = require("../services/ApointmentManagmentService");

async function findCosmetologistByTreatment(req, res) {
  try {
    const Apointment =
      await ApointmentMgnmtService.findCosmetologistByTreatment(req, res);
    return Apointment;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvaibleApointmentDates(req, res) {
  try {
    const AvaibleApointmentDates =
      await ApointmentMgnmtService.getAvailableDates(req, res);
    return AvaibleApointmentDates;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvailableSpaces(req, res) {
  try {
    const available = await ApointmentMgnmtService.getAvailableSpaces(req, res);
    return available;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createApointment(req, res) {
  try {
    const createApointment = await ApointmentMgnmtService.createApointment(req, res);
    return createApointment;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateStatus(req, res) {
  try {
    const result = await ApointmentMgnmtService.createApointment(req);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  findCosmetologistByTreatment,
  getAvaibleApointmentDates,
  getAvailableSpaces,
  createApointment,
  updateStatus,
};
