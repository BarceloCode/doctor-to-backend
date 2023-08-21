const CosmotologistSch = require("../models/CosmotologistModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
const jwt = require("jsonwebtoken");

async function login(req) {
  try {
    const user = await CosmotologistSch.findOne({
      email: req.body.email,
    }).select("email password deleted isOnline");
    if (!user || user.deleted) {
      return {
        error: true,
        msg: "User/email or password not valid, try again",
      };
    }

    const isPasswordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        error: true,
        msg: "User/email or password not valid, try again",
      };
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.EXPIRE_SECRET,
    });

    //function to put online the cosmotologist
    handleOnline(user);

    return {
      error: false,
      msg: "Welcome",
      user: user.username,
      id: user._id,
      token,
      expiresIn: process.env.EXPIRE_SECRET,
    };
  } catch (err) {
    return { error: true, msg: err.message };
  }
}

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
    }).select("-password -permissions -__v");
    if (!user || user.deleted) {
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

async function handleOnline(user) {
  try {
    const update = {
      $set: {
        isOnline: true,
      },
    };

    await CosmotologistSch.updateOne(user, update);
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function handleOffline(req) {
  try {
    const update = {
      $set: {
        isOnline: false,
      },
    };
    const user = await CosmotologistSch.findOne({ email: req.body.email });
    await CosmotologistSch.findOneAndUpdate(user, update);
    return { message: "Offline" };
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function handlePermissions(req) {
  try {
    const { email } = req.body;
    const user = await CosmotologistSch.findOne({
      email: email,
    }).select("permissions deleted");
    if (!user || user.deleted) {
      return {
        message: "User not found",
        error: true,
        error: error.message,
      };
    }
    return user;
  } catch (error) {
    return { message: "Error", error: "User not found" };
  }
}

module.exports = {
  login,
  create,
  retrive,
  update,
  softDelete,
  handleOnline,
  handleOffline,
  handlePermissions,
};
