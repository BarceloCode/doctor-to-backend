const express = require("express");
const app = express.Router();
const controller = require("../controllers/CosmotologistController");
const CosmoValidation = require("../validations/CosmotologistValidation");
const { validate } = require("../middlewares/validations");
const verifyToken = require("../middlewares/validate-token");

app.post(
  "/login",
  validate(CosmoValidation.logincosmotologist),
  async (req, res) => {
    controller.login(req, res);
  }
);

app.post(
  "/create",
  validate(CosmoValidation.cosmotologist),
  verifyToken,
  async (req, res) => {
    controller.createCosmo(req, res);
  }
);

app.get("/get/:id", verifyToken, async (req, res) => {
  controller.getAllCosmo(req, res);
});

app.put(
  "/update/:email",
  validate(CosmoValidation.updateCosmotologist),
  verifyToken,
  async (req, res) => {
    controller.updateCosmo(req, res);
  }
);

app.put(
  "/delete",
  validate(CosmoValidation.deleteCosmologist),
  verifyToken,
  async (req, res) => {
    controller.deleteCosmo(req, res);
  }
);

module.exports = app;
