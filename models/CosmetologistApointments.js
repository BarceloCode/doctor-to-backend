const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");


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

},
{
    strictPopulate: false,
  });
  CosmetologistApointmenSchema.plugin(mongoosePaginate);
const CosmetologistApointmen = mongoose.model('cosmetologistApointment', CosmetologistApointmenSchema);
CosmetologistApointmen.paginate().then({});
module.exports = CosmetologistApointmen;
