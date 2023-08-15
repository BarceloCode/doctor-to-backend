const Cosmoservice = require("../services/CosmotologistService");

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

module.exports = { createCosmo, getAllCosmo, updateCosmo };
