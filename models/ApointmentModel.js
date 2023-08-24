const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApointmentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  cosmetologist: { type: Schema.Types.ObjectId, ref: "Cosmotologist" },
  clinic: { type: Schema.Types.ObjectId, ref: "clinic" },
  patient: { type: Schema.Types.ObjectId, ref: "patient" },
  treatment: { type: Schema.Types.ObjectId, ref: "treatment" },
  consultingRoom: { type: Schema.Types.ObjectId, ref: "ConsultingRoom" },
});

const Apointment = mongoose.model("Apointment", ApointmentSchema);
module.exports = Apointment;
