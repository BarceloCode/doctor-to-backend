const express = require("express");
const app = express.Router();
const controller = require("../controllers/BusinessUnitController");
const validations = require("../validations/BusinessUnitValidations");
const { validate } = require("../middlewares/validations");

app.post(
  "/create",
  validate(validations.BusinessUnit),
  async (req, res) => {
    controller.createBunit(req, res);
  }
);

app.post(
  "/add",
  validate(validations.AddTreatmentAndClinic),
  async (req, res) => {
    controller.AddTreatmentAndClinic(req, res);
  }
);

app.get("/getall",validate(validations.checkPage), async (req, res) => {
  controller.getAllBunit(req, res);
});

app.put(
  "/update",
  validate(validations.UpdateBusinessUnit),
  async (req, res) => {
    controller.updateBunit(req, res);
  }
);


app.delete(
  "/delete",
  validate(validations.deleteCosmologist),
  async (req, res) => {
    controller.deleteCosmo(req, res);
  }
);

app.delete(
  "/restore",
  validate(validations.deleteCosmologist),
  async (req, res) => {
    controller.undoDeleteCosmo(req, res);
  }
);

module.exports = app;
