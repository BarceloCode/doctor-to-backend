const ProductsModel = require("../models/ProductsModel");
const response = require("../helpers/responses");

async function createProduct(req, res){
    try {
        const Product = new ProductsModel({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            stock: req.body.stock
        })
        await Product.save()
        .then((result) => {
            response.sendCreated(res, result)
        })
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function updateProduct(req, res){
    try {
        const { id } = req.params;
        const Product = await ProductsModel.findOneAndUpdate({_id: id},{
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            stock: req.body.stock 
        },{new: true});
        if(Product) return response.sendSuccess(res, Product);
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function getProducts (req, res){
    try {
        await ProductsModel.find({})
        .then((result) => {
            response.sendSuccess(res, result)
        })        
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function detailProduct (req, res){
    try {
        const { id } = req.params;
        const Product = await ProductsModel.findOne({_id: id})
        if(Product) return response.sendSuccess(res, Product);
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function eliminate(req, res){
    try {
        const { id } = req.params;
        const Product = await ProductsModel.deleteMany({_id: id})
        if(Product) return response.sendSuccess(res)
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

module.exports = { createProduct, updateProduct, getProducts, detailProduct, eliminate }