const mongoose = require("mongoose");
const moment = require("moment-timezone");
require("dotenv").config({ path: "../.env" });
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

const cosmotologistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  full_lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  RegisteredAt: {
    type: String,
    default: currentTime,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  Deleted: {
    type: Boolean,
    default: false,
  },
  DeletedAt: {
    type: Boolean,
    default: false,
  },
});
//location hace referencia a la clinica en la que esta la cosmotologa
const Cosmotologist = mongoose.model("Cosmotologist", cosmotologistSchema);

module.exports = Cosmotologist;
