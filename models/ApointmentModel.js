const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
const baseSchema = require("../models/baseSchema");
const ApointmentSchema = new Schema({
  date: {
    type: Date,
    default: currentTime,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    confirmationPending: {
      type: Boolean,
      default: true,
    },
    confirmedbyuser: {
      type: Boolean,
      default: false,
    },
    cancelledByUser: {
      type: Boolean,
      default: false,
    },
    cancelledbydoctor: {
      type: Boolean,
      default: false,
    },
    rescheduled: {
      type: Boolean,
      default: false,
    },
    notassisted: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    inprogress: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  cosmetologist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cosmetologist",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  treatment: {
    type: Array,
    required: true,
    ref: "treatment",
  },
});
ApointmentSchema.add(baseSchema);
ApointmentSchema.plugin(mongoosePaginate);
const Apointment = mongoose.model("apointment", ApointmentSchema);
Apointment.paginate().then({});
module.exports = Apointment;
