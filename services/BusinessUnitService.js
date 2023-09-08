const BusinessUnitSch = require("../models/BusinessUnitModel");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function retrive(req) {
  try {
    const options = {
      page: req.body.page,
      limit: 5,
      collation: {
        locale: "en",
      },
      populate: {
        path: "clinic treatment",
      },
    };
    const Bunit = await BusinessUnitSch.paginate({}, options);
    if (!Bunit || Bunit.deleted) {
      return {
        message: "Business Unit not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Business Unit found",
      error: false,
      Bunit: Bunit,
    };
  } catch (error) {
    return {
      message: "Error",
      error: error.message,
    };
  }
}

async function create(req) {
  try {
    const n = req.body.name;
    const Bunit = await BusinessUnitSch.create({
      name: n.toUpperCase(),
      clinic: req.body.clinic,
      treatment: req.body.treatment,
    });

    if (Bunit) {
      return { message: "Created succesfully", error: false };
    }
  } catch (error) {
    return {
      message: "Can't create new Business Unit",
      error: true,
      error: error.message,
    };
  }
}

async function update(req) {
  try {
    const findBuisnessUnit = await BusinessUnitSch.findOne({
      _id: req.body._id,
    }).select("_id deleted");
    const { name, clinic, treatment } = req.body;
    if (!findBuisnessUnit || findBuisnessUnit.deleted) {
      return { message: "User not found", error: true };
    }
    const update = {
      name: name,
      clinic: clinic,
      treatment: treatment,
    };
    const result = await BusinessUnitSch.updateOne(findBuisnessUnit, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req) {
  try {
    const finduser = await BusinessUnitSch.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser || finduser.deleted || req.body.email == finduser.email) {
      return { message: "User not found", error: true };
    }
    const update = {
      set: {
        deleted: true,
        deletedAt: currentTime,
      },
    };
    const result = await BusinessUnitSch.updateOne(finduser, update);
    if (result) {
      return { message: "Deleted succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}
async function UndosoftDelete(req) {
  try {
    const finduser = await BusinessUnitSch.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser) {
      return { message: "User not found", error: true };
    }
    const update = {
      set: {
        deleted: false,
        deletedAt: null,
      },
    };
    const result = await BusinessUnitSch.updateOne(finduser, update);
    if (result) {
      return { message: "Restored succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}
async function AddTreatmentAndClinic(req) {
  try {
    const { _id, clinic, treatment } = req.body;

    const findBusinessUnit = await BusinessUnitSch.findOneAndUpdate(
      { _id, deleted: false },
      {
        $addToSet: { treatment, clinic },
      },
      { new: true }
    );

    if (!findBusinessUnit) {
      return { message: "BusinessUnit not found", error: true, status: 404 };
    }

    return { message: "Added successfully", error: false, status: 201 };
  } catch (error) {
    return { message: "Error", error: error.message, status: 403 };
  }
}


module.exports = {
  create,
  retrive,
  update,
  AddTreatmentAndClinic,
  softDelete,
  UndosoftDelete,
};
