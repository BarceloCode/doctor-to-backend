const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: String, 
    sex: String, 
    age: String, 
    curp: String,
    birthdate: Date, 
    civilstatus: String, 
    religion: String, 
    ocupation: String, 
    address: String,
    email: String, 
    phone: String, 
    emergencyContact: String,
    bloodType: String
})

module.exports = mongoose.model('patient', PatientSchema);