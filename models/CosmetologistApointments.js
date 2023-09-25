const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const baseSchema = require("../models/baseSchema");

Object.keys(mongoose.models).forEach((modelName) => {
  console.log(`Modelo registrado: ${modelName}`);
});

const CosmetologistApointmenSchema = new Schema({
  cosmetologist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cosmetologist",
    required: true,
  },
  apointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "apointment",
    required: true,
  },
});
CosmetologistApointmenSchema.add(baseSchema);
CosmetologistApointmenSchema.plugin(mongoosePaginate);
const CosmetologistApointmen = mongoose.model(
  "cosmetologistApointment",
  CosmetologistApointmenSchema
);
CosmetologistApointmen.paginate().then({});
module.exports = CosmetologistApointmen;
