const ProductService = require("../services/ProductsService");

async function create (req, res){
    try {
        const Product = await ProductService.createProduct(req, res);
        return Product;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error})
    }
}

async function getProducts (req, res) {
    try {
        const Product = await ProductService.getProducts(req, res);
        return Product;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error})
    }
}

async function update (req, res){
    try {
        const Product = await ProductService.updateProduct(req, res);
        return Product;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error });
    }
}

async function eliminate (req, res ){
    try {
        const Product = await ProductService.eliminate(req, res);
        return Product;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error});
    }
}

async function detailProduct (req, res){
    try {
        const Product = await ProductService.detailProduct(req, res);
        return Product;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error })
    }
}

module.exports = { create, getProducts, update, eliminate, detailProduct  }