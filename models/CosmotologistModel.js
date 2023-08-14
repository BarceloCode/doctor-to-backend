const mongoose = require("mongoose");

const CosmotologistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  full_lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  RegisteredAt: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});
//location hace referencia a la clinica en la que esta la comotologa
const Cosmotologist = mongoose.model(Cosmotologist, CosmotologistSchema);

module.exports = Cosmotologist;
