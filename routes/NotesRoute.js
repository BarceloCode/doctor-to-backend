const express = require("express").Router();
const controller = require("../controllers/NotesController");

router.post("/create", 
    async (req, res) =>{
        controller.createNote(req, res)
    }
);