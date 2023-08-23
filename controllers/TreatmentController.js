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

    retrieveOne: async (req, res) =>{
        TreatmentModel.findById({_id: req.body._id})
        .populate('product')
            .then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
    },
    
    update: async (req, res) =>{
        let treatment = await TreatmentModel.update({
            treatmentName: req.body.treatmentName,  
            description: req.body.description,          
            price: req.body.price,
            product: req.body.product,
            quantity: req.body.quantity
        })
        await TreatmentModel.update({_id: req.body._id}, treatment)
            .then(treatment =>{
                if(!treatment) res.json({ success: false, result: "Treatment does not exist"})
            })
    },

    delete: async (req, res) =>{
        await TreatmentModel.remove({_id: req.body._id})
            .then(result =>{
                if(!result) res.json({ success: false, result: "No treatment was found with the ID ${req.body.id}"})

                res.json({ success: true, result: result})
            })
            .catch(err =>{
                res.json({ success: false, result: err})
            })
    }
    
}