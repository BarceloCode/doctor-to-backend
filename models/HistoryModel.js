const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryModel = new Schema({
    patient: {
        type: Schema.Types.ObjectId, ref: 'patient'
    },
    treatment: [{
        name: {
            type: Schema.Types.ObjectId, ref: 'treatment'
        },        
        cosmetologist: { 
            type: Schema.Types.ObjectId, ref: "cosmetologist"
        },
        date: String,
    }],
})

module.exports = mongoose.model('history', HistoryModel);