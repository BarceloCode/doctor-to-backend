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
  birthday: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: String,
    default: currentTime,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: String,
    default: null,
  },
  permissions: {
    read: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: true,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "cosmetologist",
    },
  },
  worktime: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  workdays: {
    monday: {
      type: Boolean,
      default: true,
    },
    tuesday: {
      type: Boolean,
      default: true,
    },
    wednesday: {
      type: Boolean,
      default: true,
    },
    thursday: {
      type: Boolean,
      default: true,
    },
    friday: {
      type: Boolean,
      default: true,
    },
    saturday: {
      type: Boolean,
      default: true,
    },
    sunday: {
      type: Boolean,
      default: true,
    },
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Clinic",
  },
});
//location hace referencia a la clinica en la que esta la cosmotologa
const Cosmotologist = mongoose.model("Cosmotologist", cosmotologistSchema);

module.exports = Cosmotologist;
