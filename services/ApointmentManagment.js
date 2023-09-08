const apoitmentSch = require("../models/ApointmentModel");
const businessUnitSchema = require("../models/BusinessUnitModel");
const cosmetologistSchema = require("../models/CosmetologistModel");

async function findCosmetologistByTreatment(req) {
  try {
    //pasarle el array de los tratamientos.
    const BusinessUnit = await businessUnitSchema
      .find({
        treatment: { $in: req.body.treatment },
      })
      .select("_id");

    let lenght = BusinessUnit.length;
    if (lenght === 0) {
      return {
        message:
          "Cant find BusinessUnit that can do this treatment with IDs: '" +
          req.body.treatment +
          "'",
        status: 400,
      };
    }
    if (BusinessUnit) {
      const ids = [];

      BusinessUnit.forEach((element) => {
        const idString = element._id.toString();
        ids.push(idString);
      });
      const Cosmetologist = await cosmetologistSchema
        .find({
          businessUnit: { $in: ids },
        })
        .select("_id worktime workdays name full_lastname businessUnit")
        .populate({
          path: "businessUnit",
          select: { name: 1, clinic: 1 },
          populate: { path: "clinic" },
        });
      lenght = Cosmetologist.length;
      if (lenght === 0) {
        return {
          message:
            "Error cant find Cosmetologist with BusinesUnit with IDs: '" +
            ids +
            "'",
          status: 400,
        };
      }
      if (Cosmetologist) {
        return {
          message: "Cosmetologists that can do this treatment(s):" + ids.length,
          Cosmetologist: Cosmetologist,
          status: 200,
        };
      }
    }
  } catch (error) {
    return { message: error.message, status: 400 };
  }
}

module.exports = {
  findCosmetologistByTreatment,
};
