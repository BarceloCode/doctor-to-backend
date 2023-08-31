const ProductsModel = require("../models/ProductsModel");

module.exports = {

    create: async (req, res) =>{

        try{
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
        }catch(error){
            return res.status(400).send(error)
        }
    },

    update: async(req, res) =>{
        try{
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
        }catch(error){
            return res.status(400).send(error)
        }
    },
    
    retrieve: async(req, res) =>{
        try{
            await ProductsModel.find()
            .then(result =>{
                if(!result) res.json({success: false, result: "No results found"})

                res.json({ success: true, result: result})
            })
            .catch(err => res.json({ success: false, result: err}))
        }catch(error){
            return res.status(400).send(error)
        }
    },

    retrieveOne: async(req, res) =>{
        try{
            ProductsModel.findById({_id: req.body._id})
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error, result: "No product was found"}));
        }catch(error){
            return res.status(400).send(error)
        }
    },

    delete: async(req, res) =>{
       try{
        ProductsModel
            .deleteMany({ _id: req.body._id})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}));
       }catch(error){
        return res.status(400).send(error)
       }
    }

}