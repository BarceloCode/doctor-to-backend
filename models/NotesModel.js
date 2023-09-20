const mongoose = require("mongoose");

const NotesModel = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId, ref: 'patient', 
        required: true 
    },
    notes: [{
        description: {
            type: String
        },
        date: {
            type: String,            
        }
    }]
})

const Notes = mongoose.model("notes", NotesModel);
module.exports = Notes;