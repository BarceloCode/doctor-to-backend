const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentModel = new Schema({
    treatmentName: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'products',
        required: true
    },
    quantity: Number
});

const Treatment = mongoose.model('treatment', TreatmentModel);
module.exports = Treatment;