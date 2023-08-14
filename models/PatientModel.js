const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String, 
        required: true
    },
    faceImage: String,
    curp: {
        type: String,
        required: true
    }, 
    allergies: {
        type: String,
        require: true
    },
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