const Patient = require("../models/PatientModel");
const PatientModel = require("../models/PatientModel");
const Validate = require("../validations/PatienValidation")

async function createUser (req){
    try {
        const { error } = Validate.patient(req.body);
        if (error) return res.json({ success: false, result: error.details[0].message});

        const curpExists = await PatientModel.findOne({ curp : req.body.curp });
        if (curpExists) return { success: false, result: "Patient already exists"};

        const Patient = await PatientModel.create({
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
        if(!Patient) return {
            message: "Can't create"
        }

        return {
            message: "Created successfully!",
            result: Patient
        }

    } catch (error) {
        return {
            message: "Error: " + error
        }
    }
}

async function getPatients (req){
    try {
        const Patient = await PatientModel.find({});
    if(!Patient) return {
        message: "Can't find patient"
    }
    
    return {
        message: "Patient List",
        result: Patient
    }
    } catch (error) {
        return {
            message: "Error: " + error
        }
    }
}

async function detailPatient (){
    try {
        const findPatient = await PatientModel.findOne({
            patient: req.body.patient
        });
    
        if(!findPatient) return {
            message: "Patient not found"
        }
    
        return {
            message: "Found!",
            result: findPatient
        }     
    } catch (error) {
        return {
            message: "Error" + error
        }
    }
}

async function deletePatient (req){
    try {
        const { id } = req.params;
        const Patient = await PatientModel.deleteMany({_id: id})
        if(!Patient) return { message: "Can't delete patient"}

        return {
            message: "Delete successfully!"
        }
    } catch (error) {
        return {
            message: "Error: " + error
        }
    }
}

async function updatePatient (req){
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
        if(!Patient) return { message: "Can't update patient" }
        
        return {
            message: "Updated successfully!"
        }
    } catch (error) {
        return {
            message: "Error: " + error
        }
    }
}

async function addFiles (req) {
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

module.exports = { createUser, getPatients, detailPatient, updatePatient, deletePatient, addFiles }