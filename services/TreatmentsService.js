const TreatmentModel = require("../models/TreatmentModel");
const Validate = require("../validations/TreatmentsValidations");
const response = require("../helpers/responses");

async function createTreatment(req, res){
    try {

        const { error } = Validate.treatments(req.body);
        if (error) return res.json({ success: false, result: error.details[0].message});
        
        const Treatment = new TreatmentModel({
            treatmentName: req.body.treatmentName,  
            description: req.body.description,          
            price: req.body.price,
            product: req.body.product,            
        })
        if(Treatment) return response.sendCreated(res, Treatment);
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function updateTreatment (req, res){
    try {
        const { id } = req.params;
        const Treatment = await TreatmentModel.findOneAndUpdate({_id: id},{
            treatmentName: req.body.treatmentName,  
            description: req.body.description,          
            price: req.body.price,
            product: req.body.product,            
        },{new: true})
        if(Treatment) return response.sendSuccess(res, Treatment)        
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function getTreatments (req, res){
    try {
        const Treatment = await TreatmentModel.find({})
        .populate({
            path: "product",
            select: { _id: 0, productName: 1, productPrice: 1}
        })
        if(Treatment) return response.sendSuccess(res, Treatment);
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function detailTreatments (req, res) {
    try {
        const { id } = req.params;
        const Treatment = await TreatmentModel.findOne({_id: id})
        .populate({
            path: "product",
            select: { _id: 0, productName: 1, productPrice: 1}
        })
        if(Treatment) return response.sendSuccess(res, Treatment)
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function deleteProduct (req, res){
    try {
        const { id } = req.params;
        const Treatment = await TreatmentModel.deleteMany({_id: id});
        if(Treatment) return response.sendSuccess(res);
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

module.exports = { createTreatment, updateTreatment, getTreatments, detailTreatments, deleteProduct }