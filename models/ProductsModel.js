const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductsModel = new Schema({
    productName: String,
    productPrice: Number, 
    stock: Number
})

module.exports = mongoose.model('products', ProductsModel);