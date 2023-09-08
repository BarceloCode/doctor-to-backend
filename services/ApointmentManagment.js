const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");

async function findCosmetologistByTreatment(req) {
  try {
    //pasarle el array de los tratamientos.
    const BusinessUnit = await businessUnitSchema.find({
      treatment: { $in: req.body.treatment },
    }).select("_id name");

    let flag = BusinessUnit.length;
    if (flag === 0) {
      return {
        message: "Error cant find BusinessUnit with treatments with IDs: '" + req.body.treatment + "'",
        status: 400
      };
    }
    if (BusinessUnit) {
      return { message: "Success", BusinessUnit: BusinessUnit, status: 200 };
    }
  } catch (error) {
    return { message: error.message, status: 400 };
  }
}

module.exports = {
  findCosmetologistByTreatment,
};
