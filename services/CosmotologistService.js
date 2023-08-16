const CosmotologistSch = require("../models/CosmotologistModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function create(req) {
  try {
    const email = await CosmotologistSch.findOne({ email: req.body.email });
    if (email) {
      return { message: "Email already exists" };
    }

    if (req.body.password !== req.body.passwordconfirmation) {
      return { error: "The password do not match" };
    }
    const hash = await bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALT_KEY)
    );
    const NewCosmotologist = CosmotologistSch.create({
      name: req.body.name,
      full_lastname: req.body.full_lastname,
      email: req.body.email,
      password: hash,
      passwordconfirmation: req.body.passwordconfirmation,
      phone: req.body.phone,
      location: req.body.location,
      birthday: req.body.birthday,
      gender: req.body.gender,
      role: req.body.role,
    });
    if (NewCosmotologist) {
      return { message: "Created succesfully", error: false };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Can't create new Cosmotologist",
      error: true,
      error: error.message,
    };
  }
}

async function retrive(req) {
  try {
    const { id } = req.params;
    const user = await CosmotologistSch.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).select("-password deleted");
    if (!user || finduser.deleted) {
      return {
        message: "User not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "User found",
      error: false,
      user: user,
    };
  } catch (error) {
    return { message: "Error", error: "User not found" };
  }
}

async function update(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.params.email,
    }).select("email deleted");
    const { name, full_lastname, phone, location, birthday, gender, role } =
      req.body;
    if (!finduser || finduser.deleted) {
      return { message: "User not found", error: true };
    }
    const update = {
      $set: {
        name: name,
        full_lastname: full_lastname,
        phone: phone,
        location: location,
        birthday: birthday,
        gender: gender,
        role: role,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser || finduser.deleted) {
      return { message: "User not found", error: true };
    }
    const update = {
      $set: {
        deleted: true,
        deletedAt: currentTime,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Deleted succesfully", error: false };
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
};
