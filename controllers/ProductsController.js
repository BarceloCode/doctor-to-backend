const ProductsModel = require("../models/ProductsModel");

module.exports = {

    create: async (req, res) =>{

        let product = new ProductsModel({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            stock: req.body.stock
        })
        await product.save()
            .then(result =>{
                res.json({ success: true, result: result})
            })
            .catch(err =>{
                res.json({ success: false, result: err})
            })
    }

}