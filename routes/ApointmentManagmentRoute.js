const express = require("express");
const app = express.Router();
const controller = require("../controllers/ApointmentManagmentController");
const validations = require("../validations/ApointmentValidation");
const { validate } = require("../middlewares/validations");



app.get("/get", async (req, res) => {
  controller.findCosmetologistByTreatment(req, res);
});


module.exports = app;
