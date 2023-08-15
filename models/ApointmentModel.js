const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApointmentSchema = new Schema({
    date: Date,
    treatment: String, 
    patient: [{type: Schema.Types.ObjectId, ref: 'patient'}]
    
})

module.exports = mongoose,model('apointment', ApointmentSchema);