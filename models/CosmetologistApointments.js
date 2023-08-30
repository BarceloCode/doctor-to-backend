const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    strictPopulate: true,
  });

const CosmetologistApointmen = mongoose.model('cosmetologistApointment', CosmetologistApointmenSchema);
module.exports = CosmetologistApointmen;
