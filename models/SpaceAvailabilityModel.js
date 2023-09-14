const mongoose = require("mongoose");
const moment = require("moment");
require("dotenv").config({ path: "../.env" });

const SpaceAvailabilitySchema = new mongoose.Schema({
  cosmetologist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cosmetologist",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
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
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

SpaceAvailabilitySchema.statics.calculateAndSaveAvailability = async function (
  cosmetologistId,
  date,
  workStartTime,
  workEndTime
) {
  try {
    const blockDuration = 60;
    const timeBlocks = [];
    let currentTime = moment(workStartTime).tz(process.env.TZ);

    while (currentTime.isBefore(workEndTime)) {
      const blockStart = moment(currentTime).toDate();
      currentTime.add(blockDuration, "minutes");
      const blockEnd = moment(currentTime).toDate();

      timeBlocks.push({
        startTime: blockStart,
        endTime: blockEnd,
      });
    }

    const spaceAvailability = new this({
      cosmetologist: cosmetologistId,
      date: date,
      blockedTimes: timeBlocks,
    });

    await spaceAvailability.save();

    return spaceAvailability;
  } catch (error) {
    throw error;
  }
};



const SpaceAvailability = mongoose.model(
  "SpaceAvailability",
  SpaceAvailabilitySchema
);

module.exports = SpaceAvailability;
