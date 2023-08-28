const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Machine = mongoose.model("Machine", MachineSchema);

module.exports = Machine;
