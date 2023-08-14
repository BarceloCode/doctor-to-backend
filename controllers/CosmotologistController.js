const Cosmoservice = require("../services/CosmotologistService");

async function createCosmo(req, res) {
  try {
    const cosmo = await Cosmoservice.create(req, res);
    res.status(201).json(cosmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {createCosmo};
