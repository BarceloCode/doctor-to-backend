const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true  
    }, 
    surname: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        required: true
    }, 
    age: {
        type: String,
        required: true
    }, 
    curp: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    }, 
    civilstatus: {
        type: String,
        required: true
    }, 
    religion: {
        type: String,
        required: true
    }, 
    ocupation: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }, 
    emergencyContact: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    files: [{
        type: String        
    }]
})

module.exports = mongoose.model('patient', PatientSchema);