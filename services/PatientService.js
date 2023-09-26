const PatientModel = require("../models/PatientModel");
const Validate = require("../validations/PatienValidation")
const response = require("../helpers/responses");

async function createPatient (req, res){
    try {
        const { error } = Validate.patient(req.body);
        if (error) return res.json({ success: false, result: error.details[0].message});

        const curpExists = await PatientModel.findOne({ curp : req.body.curp });
        if (curpExists) return { message: "Patient already exists"};
        console.log(curpExists);

        const Patient = new PatientModel({
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender,
            age: req.body.age,
            curp: req.body.curp,
            birthdate: req.body.birthdate,
            civilstatus: req.body.civilstatus,
            religion: req.body.religion,
            ocupation: req.body.ocupation,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            emergencyContact: req.body.emergencyContact,
            bloodType: req.body.bloodType         
        })        
        await Patient.save()
        .then((result) => {
            response.sendSuccess(res, result)
        })      
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function getPatients (req, res){
    try {
        await PatientModel.find({})
        .then((result) => {
            response.sendSuccess(res, result)
        })
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function detailPatient (req, res){
    try {
        const { id } = req.body;
        console.log(id);
        await PatientModel.findOne({ _id: id })
        .then((result) => {
            response.sendSuccess(res, result)
        })   
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function deletePatient (req, res){
    try {
        const { id } = req.params;
        const Patient = await PatientModel.deleteMany({_id: id})
        if(Patient) response.sendSuccess(res);
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function updatePatient (req, res){
    try {
        const { id } = req.params;
        const Patient = await PatientModel.findOneAndUpdate({ _id: id},{
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender,
            age: req.body.age,
            curp: req.body.curp,
            birthdate: req.body.birthdate,
            civilstatus: req.body.civilstatus,
            religion: req.body.religion,
            ocupation: req.body.ocupation,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            emergencyContact: req.body.emergencyContact,
            bloodType: req.body.bloodType
        },
        { new: true});
        if(Patient) response.sendSuccess(res, Patient)
    } catch (error) {
        return response.sendError(res, error.message)
    }
}

async function addFiles (req, res) {
    try {
        const { id } = req.params;
        const Patient = await PatientModel.findOneAndUpdate({_id: id},{
            files: req.params.files
        })
        if(!Patient) return { message: "Can't add files" }

        return { message: "Files added!" }
    } catch (error) {
        return {
            message: "Error: " + error
        }
    }
}

module.exports = { createPatient, getPatients, detailPatient, updatePatient, deletePatient, addFiles }