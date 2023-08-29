const router = require("express").Router();
const HistoryController = require("../controllers/HistoryController");
const validateToken = require("../middlewares/validate-token");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

router.use(validateToken);
router.use(permissionMiddleware);

router.post("/create", HistoryController.create);
router.get("/retrieve", HistoryController.retrieve);
router.get("/retrieveOne", HistoryController.retrieveOne);
router.put("/update", HistoryController.update);
router.delete("/delete", HistoryController.delete);

module.exports = router;