const router = require("express").Router();
const HistoryController = require("../controllers/HistoryController");


router.post("/create", async (req, res) => {
    HistoryController.createHsitory(req, res);
});

router.post("/details", async (req, res) =>{
    HistoryController.detailHistory(req, res);
});

router.delete("/delete/:id", async (req, res) =>{
    HistoryController.deleteHsitory(req, res)
});

router.get("/retrieve", async (req, res) => {
    HistoryController.getHistory(req, res);
})

module.exports = router;