const mongoose = require("mongoose");
const moment = require("moment");

const SpaceAvailabilitySchema = new mongoose.Schema({
  cosmetologist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cosmetologist",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  blockedTimes: [
    {
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  ],
});

const SpaceAvailability = mongoose.model(
  "SpaceAvailability",
  SpaceAvailabilitySchema
);

module.exports = SpaceAvailability;
