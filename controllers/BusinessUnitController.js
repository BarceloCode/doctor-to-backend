const BusinessUnitService = require("../services/BusinessUnitService");

async function getAllBunit(req, res) {
  try {
    const Bunits = await BusinessUnitService.retrive(req, res);
    res.status(200).json(Bunits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createBunit(req, res) {
  try {
    const Bunit = await BusinessUnitService.create(req, res);
    res.status(201).json(Bunit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateBunit(req, res) {
  try {
    const Bunit = await BusinessUnitService.update(req, res);
    res.status(200).json(Bunit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function AddTreatmentAndClinic(req, res) {
  try {
    const Bunit = await BusinessUnitService.AddTreatmentAndClinic(req, res);
    res.status(Bunit.status).json(Bunit);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
async function deleteBunit(req, res) {
  try {
    const Bunit = await BusinessUnitService.softDelete(req, res);
    res.status(200).json(Bunit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function undoDeleteBunit(req, res) {
  try {
    const Bunit = await BusinessUnitService.UndosoftDelete(req, res);
    res.status(200).json(Bunit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createBunit,
  getAllBunit,
  updateBunit,
  AddTreatmentAndClinic,
  deleteBunit,
  undoDeleteBunit,
};
