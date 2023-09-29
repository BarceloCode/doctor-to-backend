const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CashModel = new Schema({
    cosmetologist: {
        type: mongoose.Schema.Types.ObjectId, ref: 'cosmetologist',
        required: true
    },
    treatment: [{
        name: {
            type: String, 
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    products: [{
        product: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date
    }
})

module.exports = mongoose.model('cash', CashModel);