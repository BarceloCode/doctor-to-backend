const express = require("express");
const app = express.Router();
const controller = require("../controllers/ApointmentManagmentController");
const validations = require("../validations/ApointmentValidation");
const { validate } = require("../middlewares/validations");



app.get("/get", validate(validations.ApointmentManagmentArray), async (req, res) => {
  controller.findCosmetologistByTreatment(req, res);
});

app.get("/avaible", async (req, res) => {
  controller.getAvaibleApointmentDates(req, res);
});


module.exports = app;
