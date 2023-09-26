const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryModel = new Schema({
    patient: {
        type: Schema.Types.ObjectId, ref: 'patient',
        required: true
    },
    treatments: [{
        treatment: {
            type: Schema.Types.ObjectId, ref: 'treatment',
            required: true,
        },        
        cosmetologist: { 
            type: Schema.Types.ObjectId, ref: "cosmetologist",
            required: true
        },
        date: {
            type: String,
            required: true
        },
    }],
})

module.exports = mongoose.model('history', HistoryModel);