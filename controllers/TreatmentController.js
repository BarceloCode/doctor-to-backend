const { result } = require('@hapi/joi/lib/base');
const TreatmentModel = require('../models/TreatmentModel');

module.exports = {

    create: async (req, res) =>{
        try{
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
        }catch(error){
            return res.status(400).send(error)
        }
    },

    retrieve: async (req, res) =>{
        try{
            TreatmentModel.find()
            .populate('product')
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

    retrieveOne: async (req, res) =>{
        try{
            TreatmentModel.findById({_id: req.body._id})
            .populate('product')
            .then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        }catch(error){
            return res.status(400).send(error)
        }
    },
    
    update: async (req, res) =>{
        try{
            let treatment = await TreatmentModel.update({
                treatmentName: req.body.treatmentName,  
                description: req.body.description,          
                price: req.body.price,
                product: req.body.product,
                quantity: req.body.quantity
            })
            await TreatmentModel.update({_id: req.body._id}, treatment)
                .then(result =>{
                    if(!result) res.json({ success: false, result: "Treatment does not exist"})

                    res.json({ success: true, result: result})
                })
        }catch(error){
            return res.status(400).send(error)
        }
    },

    delete: async (req, res) =>{
        try{
            TreatmentModel.deleteMany({_id: req.body._id})
            .deleteMany({ _id: req.body._id})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}));
        }catch(error){
            return res.status(400).send(error)
        }        
    }    
}