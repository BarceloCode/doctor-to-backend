const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApointmentSchema = new Schema({
    date: Date,
    treatment: String,
    description: String,
    confirmed: Boolean,
    cosmetologist: [{type: Schema.Types.ObjectId, ref: 'Cosmotologist'}],
    clinic: [{type: Schema.Types.ObjectId, ref: 'clinic'}],
    patient: [{type: Schema.Types.ObjectId, ref: 'patient'}]
})

module.exports = mongoose,model('apointment', ApointmentSchema);