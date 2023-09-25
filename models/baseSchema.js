const mongoose = require("mongoose");
const moment = require("moment-timezone");
require("dotenv").config({ path: "../.env" });
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().utc().local();
const baseSchema = new mongoose.Schema(
  {
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      currentTime: () => currentTime,
    },
  }
);

module.exports = baseSchema;
