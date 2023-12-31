const Cosmoservice = require("../services/CosmotologistService");

async function login(req, res) {
  try {
    const CosmoLogin = await Cosmoservice.login(req, res);
    res.status(201).json(CosmoLogin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createCosmo(req, res) {
  try {
    const cosmo = await Cosmoservice.create(req, res);
    res.status(201).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllCosmo(req, res) {
  try {
    const cosmos = await Cosmoservice.retrive(req, res);
    res.status(200).json(cosmos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateCosmo(req, res) {
  try {
    const cosmo = await Cosmoservice.update(req, res);
    res.status(200).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateWorktimeAndDays(req, res) {
  try {
    const cosmo = await Cosmoservice.updateWorktimeAndDays(req, res);
    res.status(200).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteCosmo(req, res) {
  try {
    const cosmo = await Cosmoservice.softDelete(req, res);
    res.status(200).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function undoDeleteCosmo(req, res) {
  try {
    const cosmo = await Cosmoservice.UndosoftDelete(req, res);
    res.status(200).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function offline(req, res) {
  try {
    const cosmo = await Cosmoservice.handleOffline(req, res);
    res.status(200).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  login,
  createCosmo,
  getAllCosmo,
  updateCosmo,
  deleteCosmo,
  undoDeleteCosmo,
  offline,
  updateWorktimeAndDays
};
