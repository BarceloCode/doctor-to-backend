const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesModel = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId, ref: 'patient', 
        required: true
    },
    notes: [{
        description: {
            type: String
        },
        date: {
            type: Date.now()
        }
    }]
})

module.exports = mongoose.model('notes', NotesModel);