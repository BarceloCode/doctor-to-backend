const mongoose = require("mongoose");
const moment = require("moment-timezone");
require("dotenv").config({ path: "../.env" });
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

const CosmotologistSchema = new mongoose.Schema({
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
      default: new Date('2000-01-01T00:00:00Z')
    },
    end: {
      type: Date,
      required: true,
      default: new Date('2000-01-01T00:00:00Z')
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
  businessUnit: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "BusinessUnit",
    required: true,
  },
});

CosmotologistSchema.virtual('formatDate').get(function (){

  const start = moment(this.worktime.start).tz(process.env.TZ).format('HH:mm:ss');
  const end = moment(this.worktime.end).tz(process.env.TZ).format('HH:mm:ss');

  return { start: start, end: end };
});

const Cosmotologist = mongoose.model("cosmetologist", CosmotologistSchema);

module.exports = Cosmotologist;
