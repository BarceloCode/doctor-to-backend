const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: String, 
    sex: String, 
    age: Number, 
    curp: String,
    birthdate: Date, 
    civilstatus: String, 
    religion: String, 
    ocupation: String, 
    address: String,
    email: String, 
    phone: Number, 
    emergencyContact: Number,
    bloodType: String
})

module.exports = mongoose.model('patient', PatientSchema);