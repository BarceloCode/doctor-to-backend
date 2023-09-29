const ApointmentMgnmtService = require("../services/ApointmentManagmentService");

async function findCosmetologistByTreatment(req, res) {
  try {
    const result = await ApointmentMgnmtService.findCosmetologistByTreatment(req,res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvaibleApointmentDates(req, res) {
  try {
    const result = await ApointmentMgnmtService.getAvailableDates(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvailableSpaces(req, res) {
  try {
    const result = await ApointmentMgnmtService.getAvailableSpaces(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createApointment(req, res) {
  try {
    const result = await ApointmentMgnmtService.createApointment(req, res);
    return result;
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
