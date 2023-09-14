const router = require("express").Router();
const controller = require("../controllers/NotesController");

router.post("/create", 
    async (req, res) =>{
        controller.createNote(req, res)
    }
);

router.get("/retrieve", 
    async (req, res) =>{
        controller.retrieveAll(req, res)
    }
);

router.post("/usernotes", 
    async (req, res) =>{
        controller.retrieveUsernotes(req, res)
    }
)

router.put("/deletenotes", 
    async(req, res) =>{
        controller.deleteNotes(req, res)
    }
);

module.exports = router;