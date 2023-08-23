const router = require('express').Router();
const ProductsController = require("../controllers/ProductsController") ;

router.post("/create", ProductsController.create);

module.exports = router;