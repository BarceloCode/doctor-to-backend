const router = require('express').Router();
const TreatmentController = require('../controllers/TreatmentController');


router.post("/create", async (req, res) =>{
    TreatmentController.createTreatment(req, res)
});

router.put("/update/:id", async (req, res) => {
    TreatmentController.updateTreatment(req, res)
});

router.get("/retrieve", async (req, res) =>{
    TreatmentController.getTreatments(req, res);
});

router.get("/details/:id", async (req, res) =>{
    TreatmentController.detailTreatments(req, res)
});

router.delete("/delete/:id", async (req, res) => {
    TreatmentController.eliminate(req, res);
});

module.exports = router;