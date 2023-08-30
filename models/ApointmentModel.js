const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApointmentSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      confirmationPending: {
        type: Boolean,
        default: true,
      },
      confirmedbyuser: {
        type: Boolean,
        default: false,
      },
      cancelledByUser: {
        type: Boolean,
        default: false,
      },
      cancelledbydoctor: {
        type: Boolean,
        default: false,
      },
      rescheduled: {
        type: Boolean,
        default: false,
      },
      notassisted: {
        type: Boolean,
        default: false,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      inprogress: {
        type: Boolean,
        default: false,
      },
    },
    cosmetologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cosmotologist",
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "treatment",
      required: true,
    },
    consultingRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConsultingRoom",
      required: true,
    },
  },
  {
    strictPopulate: false,
  }
);

const Apointment = mongoose.model("Apointment", ApointmentSchema);
module.exports = Apointment;
