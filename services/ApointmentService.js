const ApointmentSchema = require("../models/ApointmentModel");
const CosmetologistApointmentSchema = require("../models/CosmetologistApointments");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function retrive() {
  try {
    const Apointment = await CosmetologistApointmentSchema.find({})
      .populate({
        path: "apointment",
        select: { cosmetologist: 0 },
        populate: {
          path: "treatment",
          populate: { path: "product" },
        },
      })
      .populate({
        path: "cosmetologist",
        select: { name: 1, full_lastname: 1, email: 1, phone: 1, location: 1 },
        populate: { path: "location", select: { name: 1, address: 1 } },
      });

    if (!Apointment || Apointment.deleted || Apointment.length === 0) {
      return {
        message: "Apointment not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Apointment found!",
      error: false,
      Apointments: Apointment,
    };
  } catch (error) {
    return { message: error.message, error: "Apointment not found" };
  }
}
async function retriveOne(req) {
  try {
    const Apointment = await CosmetologistApointmentSchema.findOne({_id:req.body._id})
      .populate({
        path: "apointment",
        select: { cosmetologist: 0 },
        populate: {
          path: "treatment",
          populate: { path: "product" },
        },
      })
      .populate({
        path: "cosmetologist",
        select: { name: 1, full_lastname: 1, email: 1, phone: 1, location: 1 },
        populate: { path: "location", select: { name: 1, address: 1 } },
      });

    if (!Apointment || Apointment.deleted || Apointment.length === 0) {
      return {
        message: "Apointment not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Apointment found!",
      error: false,
      Apointment: Apointment,
    };
  } catch (error) {
    return { message: error.message, error: "Apointment not found" };
  }
}

async function create(req) {
  try {
    const Apointment = await ApointmentSchema.create({
      date: req.body.date,
      description: req.body.description,
      cosmetologist: req.body.cosmetologist,
      patient: req.body.patient,
      treatment: req.body.treatment,
    });
    const CosmeApoint = HandleCosmetologistApointments(
      Apointment.cosmetologist,
      Apointment._id
    );

    if (Apointment && CosmeApoint) {
      return { message: "Apointment Created succesfully", error: false };
    }
  } catch (error) {
    return {
      message: "Can't create",
      error: true,
      error: error.message,
    };
  }
}

async function update(req) {
  try {
    const finduser = await ApointmentSchema.findOne({
      email: req.params.email,
    }).select("email deleted");
    const {
      name,
      full_lastname,
      phone,
      location,
      birthday,
      gender,
      businessUnit,
    } = req.body;
    if (!finduser || finduser.deleted) {
      return { message: "User not found", error: true };
    }
    const update = {
      set: {
        name: name,
        full_lastname: full_lastname,
        phone: phone,
        location: location,
        businessUnit: businessUnit,
        birthday: birthday,
        gender: gender,
      },
    };
    const result = await ApointmentSchema.updateOne(finduser, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req) {
  try {
    const finduser = await ApointmentSchema.findOne({
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
    const result = await ApointmentSchema.updateOne(finduser, update);
    if (result) {
      return { message: "Deleted succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}
async function UndosoftDelete(req) {
  try {
    const finduser = await ApointmentSchema.findOne({
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
    const result = await ApointmentSchema.updateOne(finduser, update);
    if (result) {
      return { message: "Restored succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function HandleCosmetologistApointments(cosmetologist_id, apointment_id) {
  try {
    const CosmeApoint = await CosmetologistApointmentSchema.create({
      cosmetologist: cosmetologist_id,
      apointment: apointment_id,
    });
    if (CosmeApoint) {
      console.log("HOLSA");
      return true;
    }
  } catch (error) {
    return { message: error.message, error: true };
  }
}

module.exports = {
  create,
  retrive,
  retriveOne,
  update,
  softDelete,
  UndosoftDelete,
  HandleCosmetologistApointments,
};
