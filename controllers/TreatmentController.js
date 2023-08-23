const TreatmentModel = require('../models/TreatmentModel');

module.exports = {

    create: async (req, res) =>{
        let treatment = new TreatmentModel({
            treatmentName: req.body.treatmentName,  
            description: req.body.description,          
            price: req.body.price,
            product: req.body.product,
            quantity: req.body.quantity
        })
        await treatment.save()
            .then(result =>{
                res.json({ success: true, result: result });
            })
            .catch(err =>{
                res.json({ success: false, result: err})
            })
    },

    retrieve: async (req, res) =>{
        TreatmentModel.find()
        .populate('product')
            .then(result =>{
                res.json({ success: true, result: result})
            })
            .catch(err =>{
                res.json({ success: false, result: err})
            })
    },
    
    update: async (req, res) =>{
        
    }
    
}