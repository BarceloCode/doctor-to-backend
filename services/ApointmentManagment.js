const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");


async function findCosmetologistByTreatment(req) {
  //pasarle los id de los tratamientos.
  const BusinessUnit = await businessUnitSchema.find({treatment: req.body.treatment});
  
  console.log(BusinessUnit);
}

module.exports = {
  findCosmetologistByTreatment,
};
