const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: String, 
    age: String,
    sex: String,
    faceImage: String,
    curp: String, 
    allergies: String,
    freqD: String,
    freqS: String, 
    oxygen: String, 
    signedletter: String, 
    aditionalInfo: [{
        type: Schema.Types.ObjectId, ref: 'aditionalInfo'
    }],
    roadMap: [{
        type: Schema.Types.ObjectId, ref: 'roadMap'
    }]
})

module.exports = mongoose.model('patient', PatientSchema);