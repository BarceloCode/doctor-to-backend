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
    },

    update: async(req, res) =>{
        let product = await ProductsModel.findByIdAndUpdate(req.body._id,{
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            stock: req.body.stock
        },{
            new: true
        })
        if(!product){
            return res.status(400).send("Product does not exists");
        }
        res.status(200).send("product");
    },
    
    retrieve: async(req, res) =>{
        await ProductsModel.find()
            .then(result =>{
                if(!result) res.json({success: false, result: "No results found"})

                res.json({ success: true, result: result})
            })
            .catch(err => res.json({ success: false, result: err}))
    },

    retrieveOne: async(req, res) =>{
        ProductsModel.findById({_id: req.body._id})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error, result: "No product was found"}));
    },

    delete: async(req, res) =>{

    }

}