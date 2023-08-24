const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApointmentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  cosmetologist: {
    type: Schema.Types.ObjectId,
    ref: "Cosmotologist",
    required: true,
  },
  clinic: { type: Schema.Types.ObjectId, ref: "clinic", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "patient", required: true },
  treatment: { type: Schema.Types.ObjectId, ref: "treatment", required: true },
  consultingRoom: { type: Schema.Types.ObjectId, ref: "ConsultingRoom", required: true },
});

const Apointment = mongoose.model("Apointment", ApointmentSchema);
module.exports = Apointment;
