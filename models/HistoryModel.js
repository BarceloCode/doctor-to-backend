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
        date: String,
        cosmetologic: { 
            type: Schema.Types.ObjectId, ref: "Cosmotologist"
        }
    }],
})

module.exports = mongoose.model('history', HistoryModel);