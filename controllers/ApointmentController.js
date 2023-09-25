const ApointmentService = require("../services/ApointmentService");

async function getAllApointment(req, res) {
  try {
    const result = await ApointmentService.retrive(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getOneByid(req, res) {
  try {
    const result = await ApointmentService.retriveOne(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createApointment(req, res) {
  try {
    const result = await ApointmentService.create(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateApointment(req, res) {
  try {
    const result = await ApointmentService.update(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteApointment(req, res) {
  try {
    const result = await ApointmentService.softDelete(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function undoDeleteApointment(req, res) {
  try {
    const result = await ApointmentService.UndosoftDelete(req, res);
    return result;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createApointment,
  getAllApointment,
  getOneByid,
  updateApointment,
  deleteApointment,
  undoDeleteApointment,
};
