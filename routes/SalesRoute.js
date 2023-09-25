const router = require("express").Router();
const SalesController = require("../controllers/SalesController");+

router.post("/create", 
    async(req, res) =>{
        SalesController.createSale(req, res)
    }
);

router.post("/retrieve",
    async (req, res) =>{
        SalesController.getDoctorsales(req, res)
    }
);

router.post("/close", 
    async (req, res) =>{
        SalesController.viewCash(req, res)
    }
)

module.exports = router;