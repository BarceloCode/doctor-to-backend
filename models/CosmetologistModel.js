const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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
  businessUnit: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "BusinessUnit",
    required: true,
  },
  availableSpaces: {
    type: Number,
    default: 0,
  },
});

CosmotologistSchema.pre("save", function (next) {
  const start = moment(this.worktime.start);
  const end = moment(this.worktime.end);

  // Calcular la diferencia en horas
  const hoursDifference = end.diff(start, "hours");

  // Redondear hacia abajo para obtener la cantidad de espacios
  this.availableSpaces = Math.floor(hoursDifference);

  next();
});
CosmotologistSchema.virtual("formatDate").get(function () {
  const start = moment(this.worktime.start)
    .tz(process.env.TZ)
    .format(process.env.FORMAT_APOINTMENT);
  const end = moment(this.worktime.end)
    .tz(process.env.TZ)
    .format(process.env.FORMAT_APOINTMENT);
  console.log(currentTime);

  return { start: start, end: end };
});

CosmotologistSchema.plugin(mongoosePaginate);
const Cosmotologist = mongoose.model("cosmetologist", CosmotologistSchema);
Cosmotologist.paginate().then({});
module.exports = Cosmotologist;
