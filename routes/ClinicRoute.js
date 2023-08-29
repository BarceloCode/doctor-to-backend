const express = require("express");
const app = express.Router();
const controller = require("../controllers/ClinicController");
const validations = require("../validations/ClinicValidation");
const { validate } = require("../middlewares/validations");
const validateToken = require("../middlewares/validate-token");
// const veryfyExcloudesRoutes = require("../middlewares/excloudesRoutes");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

//aqui primero se valida si es valido el token y despues se valida que se tenga permisos pera realizar la peticion dependiendo
//el metodo GET, POST, PUT, PATCH, DELETE la rutas arriba de esto son rutas publicas como login, refresh, create (registrar)
app.use(validateToken);
app.use(permissionMiddleware);

app.post("/create", validate(validations.createClinic), async (req, res) => {
  controller.createClinic(req, res);
});

app.get("/getall", async (req, res) => {
  controller.getAllClinic(req, res);
});

app.get("/getOne", validate(validations.getClinic), async (req, res) => {
  controller.getOneClinic(req, res);
});

app.get("/getOnebyId",validate(validations.deleteClinic), async (req, res) => {
  controller.getOneClinicbyId(req, res);
});

app.put(
  "/update/:id",
  validate(validations.createClinic),
  async (req, res) => {
    controller.updateClinic(req, res);
  }
);

app.delete(
  "/delete",
  validate(validations.deleteClinic),
  async (req, res) => {
    controller.deleteClinic(req, res);
  }
);

app.delete(
  "/restore",
  validate(validations.deleteClinic),
  async (req, res) => {
    controller.undoDeleteClinic(req, res);
  }
);

module.exports = app;
