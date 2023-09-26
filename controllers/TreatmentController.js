const TreatmentService = require("../services/TreatmentsService");

async function createTreatment (req, res){
    try {
        const Treatment = await TreatmentService.createTreatment(req, res);
        return Treatment;
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

async function updateTreatment(req, res){
    try {
        const Treatment = await TreatmentService.updateTreatment(req, res);
        return Treatment;
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}

async function getTreatments (req, res){
    try {
        const Treatment = await TreatmentService.getTreatments(req, res);
        return Treatment;
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}

async function detailTreatments(req, res){
    try {
        const Treatment = await TreatmentService.detailTreatments(req, res);
        return Treatment;
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

async function eliminate (req, res){
    try {
        const Treatment = await TreatmentService.deleteProduct(req, res);
        return Treatment;
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}

module.exports = { createTreatment, updateTreatment, getTreatments, detailTreatments, eliminate }