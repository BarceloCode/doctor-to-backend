const mongoose = require("mongoose");

const consultingRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    required: true,
    default: false,
  },
  machines: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
});

const ConsultingRoom = mongoose.model("ConsultingRoom", consultingRoomSchema);
module.exports = ConsultingRoom;
