const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

Object.keys(mongoose.models).forEach(modelName => {
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

},);
  CosmetologistApointmenSchema.plugin(mongoosePaginate);
const CosmetologistApointmen = mongoose.model('cosmetologistApointment', CosmetologistApointmenSchema);
CosmetologistApointmen.paginate().then({});
module.exports = CosmetologistApointmen;
