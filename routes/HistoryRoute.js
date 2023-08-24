const router = require("express").Router();
const HistoryController = require("../controllers/HistoryController");

router.post("/create", HistoryController.create);
router.get("/retrieve", HistoryController.retrieve);
router.get("/retrieveOne", HistoryController.retrieveOne);

module.exports = router;