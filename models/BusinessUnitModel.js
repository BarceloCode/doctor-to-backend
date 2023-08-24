const mongoose = require("mongoose");

const businessUnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  consultingRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConsultingRoom",
    required: true,
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "treatment",
    required: true,
  },
});
const BusinessUnit = mongoose.model("BusinessUnit", businessUnitSchema);

module.exports = BusinessUnit;
