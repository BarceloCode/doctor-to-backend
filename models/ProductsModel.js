const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductsModel = new Schema({
    productName: String,
    productPrice: String, 
    stock: Number
})

module.exports = mongoose.model('products', ProductsModel);