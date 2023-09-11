const express = require("express");
const app = express.Router();
const controller = require("../controllers/ApointmentController");
const validations = require("../validations/ApointmentValidation");
const { validate } = require("../middlewares/validations");

app.post(
  "/create",
  validate(validations.createApointment),
  async (req, res) => {
    controller.createApointment(req, res);
  }
);

app.get("/getall", validate(validations.currentPage), async (req, res) => {
  controller.getAllApointment(req, res);
});

app.get("/getOne", validate(validations.checkID), async (req, res) => {
  controller.getOneByid(req, res);
});

app.put(
  "/update",
  validate(validations.checkforUpte),
  async (req, res) => {
    controller.updateApointment(req, res);
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
