const PatientService = require("../services/PatientService");
const Response = require("../helpers/responses");

async function create (req, res){
    try {
        const Patient = await PatientService.createPatient(req, res);
        return res.json(Patient);
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error })
    }
}

async function retrieve(req, res){
    try {
        const Patient = await PatientService.getPatients(req, res);
        return Patient;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error})
    }
}

async function update (req, res){
    try {
        const Patient = await PatientService.updatePatient(req, res);
        return Patient;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error})
    }
}

async function eliminate(req, res){
    try {
        const Patient = await PatientService.deletePatient(req, res);
        return Patient;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error});
    }
}

async function retrieveOne (req, res){
    try {
        const Patient = await PatientService.detailPatient(req, res);
        return Patient;
    } catch (error) {
        return res.status(400).json({ message: "Error: " + error });
    }
}

module.exports = { create, retrieve, update, eliminate, update, retrieveOne }