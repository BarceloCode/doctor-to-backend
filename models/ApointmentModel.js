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
      ref: "cosmetologist",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    treatment: {
      type: Array,
      required: true,
      ref: "treatment",
    },
  },
  {
    strictPopulate: false,
  }
);

const Apointment = mongoose.model("apointment", ApointmentSchema);
module.exports = Apointment;
