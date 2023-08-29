const ClinicService = require("../services/ClinicService");

async function getAllClinic(req, res) {
  try {
    const Clinics = await ClinicService.retrive(req, res);
    res.status(200).json(Clinics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getOneClinic(req, res) {
  try {
    const Clinics = await ClinicService.retriveOne(req, res);
    res.status(200).json(Clinics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getOneClinicbyId(req, res) {
  try {
    const Clinics = await ClinicService.retriveOnebyId(req, res);
    res.status(200).json(Clinics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createClinic(req, res) {
  try {
    const Clinic = await ClinicService.create(req, res);
    res.status(201).json(Clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateClinic(req, res) {
  try {
    const Clinic = await ClinicService.update(req, res);
    res.status(200).json(Clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteClinic(req, res) {
  try {
    const Clinic = await ClinicService.softDelete(req, res);
    return Clinic;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function undoDeleteClinic(req, res) {
  try {
    const Clinic = await ClinicService.UndosoftDelete(req, res);
    return Clinic;
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createClinic,
  getAllClinic,
  getOneClinic,
  getOneClinicbyId,
  updateClinic,
  deleteClinic,
  undoDeleteClinic,
};
