const router = require('express').Router();
const ProductsController = require("../controllers/ProductsController");


router.post("/create", async (req, res) =>{
    ProductsController.create(req, res);
})

router.put("/update/:id", async (req, res) => {
    ProductsController.update(req, res);
})

router.post("/retrieveOne/:id", async (req, res) => {
    ProductsController.detailProduct(req, res);
})

router.get("/retrieve", async (req, res) =>{
    ProductsController.getProducts(req, res)
})

router.delete("/delete/:id", async (req, res) =>{
    ProductsController.eliminate(req, res);
});

module.exports = router;