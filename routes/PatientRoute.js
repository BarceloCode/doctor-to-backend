const router = require('express').Router();
const PatientController = require("../controllers/PatientControl");

router.post("/create", async (req, res) =>{
    PatientController.create(req, res)
});

router.post("/retrieveOne", async (req, res) =>{
    PatientController.retrieveOne(req, res)
});

router.get("/retrieve", async (req, res) =>{
    PatientController.retrieve(req, res);
});

router.put("/update/:id", async (req, res) =>{
    PatientController.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
    PatientController.eliminate(req, res);
});


module.exports = router;