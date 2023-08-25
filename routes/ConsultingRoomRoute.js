const express = require("express");
const app = express.Router();
const controller = require("../controllers/ConsultingRoomController");
const validations = require("../validations/ConsultingRoomValidation");
const { validate } = require("../middlewares/validations");
const validateToken = require("../middlewares/validate-token");
// const veryfyExcloudesRoutes = require("../middlewares/excloudesRoutes");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

//aqui primero se valida si es valido el token y despues se valida que se tenga permisos pera realizar la peticion dependiendo
//el metodo GET, POST, PUT, PATCH, DELETE la rutas arriba de esto son rutas publicas como login, refresh, create (registrar)
app.use(validateToken);
app.use(permissionMiddleware);

app.post(
  "/create",
  validate(validations.createConsultingRoom),
  async (req, res) => {
    controller.createConsultingRoom(req, res);
  }
);

app.get("/getall", async (req, res) => {
  controller.getAllConsultingRoom(req, res);
});

app.put(
  "/update/:email",
  validate(validations.updateCosmotologist),
  async (req, res) => {
    controller.updateCosmo(req, res);
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
