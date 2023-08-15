const express = require("express");
const app = express.Router();
const controller = require("../controllers/CosmotologistController");
const CosmoValidation = require("../validations/CosmotologistValidation");
const { validate } = require("../middlewares/validations");

app.post(
  "/create",
  validate(CosmoValidation.cosmotologist),
  async (req, res) => {
    controller.createCosmo(req, res);
  }
);

app.get("/get/:id", async (req, res) => {
  controller.getAllCosmo(req, res);
});

app.put("/update/:email", validate(CosmoValidation.updateCosmotologist), async (req, res) => {
  controller.updateCosmo(req, res);
});

module.exports = app;
