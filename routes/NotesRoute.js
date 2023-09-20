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

router.delete("/deletenotes/:id", 
    async(req, res) =>{
        controller.deleteNotes(req, res)
    }
);

router.put("/update/:id",
    async(req, res) =>{
        controller.updateNotes(req, res)
    }
)

module.exports = router;