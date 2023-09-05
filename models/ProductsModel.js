const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductsModel = new Schema({
    productName: {
        type: String, 
        required: true,
    },
    productPrice: {
        type: Number, 
        required: true,
    }, 
    stock: {
        type: Number, 
        required: true,
    }
})
const Product = mongoose.model('products', ProductsModel);
module.exports = Product;