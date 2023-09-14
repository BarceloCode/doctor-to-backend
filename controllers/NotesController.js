const Notes = require("../models/NotesModel");
const NotesService = require("../services/NotesService");

async function createNote (req, res) {
    try{
        const Notes = await NotesService.create(req, res);
        res.status(200).json(Notes);
    }catch(error ){
        res.status(400).json({ message: error.message })
    }
}

async function retrieveAll (req, res) {
    try{
        const Notes = await NotesService.getAll(req, res);
        res.status(200).json(Notes);
    }catch(error){
        return {
            message: "Internal server error: " + error
        }
    }
}

async function retrieveUsernotes (req, res) {
    try{
        const Notes = await NotesService.getuserNotes(req, res);
        res.status(200).json(Notes);
    }catch(error){
        return {
            message: "Internal server error: " + error
        }
    }
}

async function deleteNotes (req, res) {
    try{
        const Notes = await NotesService.deleteuserNotes(req, res);
        res.status(200).json(Notes);
    }catch(error){
        return {
            message: "Internal server error: " + error
        }
    }
}

module.exports = { createNote, retrieveAll, retrieveUsernotes, deleteNotes };