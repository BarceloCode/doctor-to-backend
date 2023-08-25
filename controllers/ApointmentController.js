const ApointmentService = require("../services/ApointmentService");



async function getAllApointment(req, res) {
    try {
      const Apointment = await ApointmentService.retrive(req, res);
      res.status(200).json(Apointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

async function createApointment(req, res) {
  try {
    const Apointment = await ApointmentService.create(req, res);
    res.status(201).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



async function updateApointment(req, res) {
  try {
    const Apointment = await ApointmentService.update(req, res);
    res.status(200).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteApointment(req, res) {
  try {
    const Apointment = await ApointmentService.softDelete(req, res);
    res.status(200).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function undoDeleteApointment(req, res) {
  try {
    const Apointment = await ApointmentService.UndosoftDelete(req, res);
    res.status(200).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  createApointment,
  getAllApointment,
  updateApointment,
  deleteApointment,
  undoDeleteApointment,
};
