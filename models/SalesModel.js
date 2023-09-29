const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesModel = new Schema({
    cosmetologist: {
      type: mongoose.Schema.Types.ObjectId, ref: 'cosmetologist',
      required: true, 
    },
    date: {
        type: Date,
        default: Date.now
    },
    treatment:[{
        name: {
            type: String,
            requires: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    products: [{
        id: {
            type: String,
            required: true
        },
        product: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    }],       
    total: {
        type: Number,
        required: true
    },
    totaliva: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('sales', SalesModel);

