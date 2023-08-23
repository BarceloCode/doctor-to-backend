const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true  
    }, 
    sex: {
        type: String,
        required: true,
    }, 
    age: {
        type: String,
        required: true,
    }, 
    curp: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    }, 
    civilstatus: {
        type: String,
        required: true,
    }, 
    religion: {
        type: String,
        required: true,
    }, 
    ocupation: {
        type: String,
        required: true,
    }, 
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String,
        required: true,
    }, 
    emergencyContact: {
        type: String,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('patient', PatientSchema);