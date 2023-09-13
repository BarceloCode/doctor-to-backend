const NotesSchema = require("../models/NotesModel");
require("dotenv").config({ path: "../.env" });

async function create (req){
    try{
        const Notes = await NotesSchema.create({
            patient: req.body.patient,
            description: req.body.description
        })
        if(Notes){
            return { message: "Created successfully", error: false };
        }
    }catch(error){
        return {
            message: "Can't create",
            error: true,
            error: error.message
        };
    }
}

module.exports = { create }