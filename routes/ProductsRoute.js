const router = require('express').Router();
const ProductsController = require("../controllers/ProductsController");


router.post("/create", ProductsController.create);
router.get("/retrieve", ProductsController.retrieve);
router.get("/retrieveOne", ProductsController.retrieveOne);
router.put("/update", ProductsController.update);
router.delete("/delete", ProductsController.delete);

module.exports = router;