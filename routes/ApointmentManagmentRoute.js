const express = require("express");
const app = express.Router();
const controller = require("../controllers/ApointmentManagmentController");
const validations = require("../validations/ApointmentValidation");
const { validate } = require("../middlewares/validations");

app.get(
  "/get",
  validate(validations.ApointmentManagmentArray),
  async (req, res) => {
    controller.findCosmetologistByTreatment(req, res);
  }
);

app.get("/avaible", validate(validations.checkID), async (req, res) => {
  controller.getAvaibleApointmentDates(req, res);
});

app.get("/avaible/spaces", validate(validations.checkFieldsAvaibleSpaces), async (req, res) => {
  controller.getAvailableSpaces(req, res);
});

app.post("/create", validate(validations.createApointment), async (req, res) => {
  controller.createApointment(req, res);
});

module.exports = app;
