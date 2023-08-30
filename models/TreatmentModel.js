const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentModel = new Schema({
    treatmentName: String,
    description:  String,
    price: Number,
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'products'
    },
    quantity: Number
});


module.exports = mongoose.model('treatment', TreatmentModel);