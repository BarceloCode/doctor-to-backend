const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: String,
    default: null,
  },

  worktime: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    }
  },
  consultingRoom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConsultingRoom',
    required: true,
  }
});
const modelNames = mongoose.modelNames();
console.log(modelNames);
const clinic = mongoose.model("clinic", clinicSchema);

module.exports = clinic;
