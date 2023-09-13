const NotesService = require("../services/NotesService");

async function createNote (req, res) {
    try{
        const Notes = await NotesService.create(req, res);
        res.status(201).json(Notes);
    }catch(error ){
        res.status(400).json({ message: error.message })
    }
}

module.exports = { createNote };