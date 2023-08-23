const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryModel = new Schema({
    patient: {
        type: Schema.Types.ObjectId, ref: 'patient'
    },
    treatment: {
        type: Schema.Types.ObjectId, ref: 'treatment'
    }
})

module.exports = mongoose.model('history', HistoryModel);