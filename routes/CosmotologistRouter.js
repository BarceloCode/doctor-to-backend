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

module.exports = app;
