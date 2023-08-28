const ApointmentSchema = require("../models/ApointmentModel");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function retrive() {
  try {
    const Apointment = await ApointmentSchema.find();
    if (!Apointment || Apointment.deleted) {
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
    return { message: "Error", error: "Apointment not found" };
  }
}

async function create(req) {
  try {
    const Apointment = await ApointmentSchema.create({
      date: req.body.date,
      description: req.body.description,
      cosmetologist: req.body.cosmetologist,
      clinic: req.body.clinic,
      patient: req.body.patient,
      treatment: req.body.treatment,
      consultingRoom: req.body.consultingRoom
    });

    if (Apointment) {
      return { message: "Created succesfully", error: false };
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

module.exports = {
  create,
  retrive,
  update,
  softDelete,
  UndosoftDelete,
};
