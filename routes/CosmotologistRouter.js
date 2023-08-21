const express = require("express");
const app = express.Router();
const controller = require("../controllers/CosmotologistController");
const CosmoValidation = require("../validations/CosmotologistValidation");
const { validate } = require("../middlewares/validations");
const validateToken = require("../middlewares/validate-token");
// const veryfyExcloudesRoutes = require("../middlewares/excloudesRoutes");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");



// app.use(veryfyExcloudesRoutes);

app.post(
  "/login",
  validate(CosmoValidation.logincosmotologist),
  async (req, res) => {
    controller.login(req, res);
  }
);

app.post(
  "/refresh",
  validate(CosmoValidation.logincosmotologist),
  async (req, res) => {
    controller.login(req, res);
  }
);

app.post(
  "/create",
  validate(CosmoValidation.cosmotologist),
  async (req, res) => {
    controller.createCosmo(req, res);
  }
);
//aqui primero se valida si es valido el token y despues se valida que se tenga permisos pera realizar la peticion dependiendo
//el metodo GET, POST, PUT, PATCH, DELETE la rutas arriba de esto son rutas publicas como login, refresh, create (registrar)
app.use(validateToken);
app.use(permissionMiddleware);


app.get("/get/:id", async (req, res) => {
  controller.getAllCosmo(req, res);
});

app.put(
  "/update/:email",
  validate(CosmoValidation.updateCosmotologist),
  async (req, res) => {
    controller.updateCosmo(req, res);
  }
);

app.delete(
  "/delete",
  validate(CosmoValidation.deleteCosmologist),
  async (req, res) => {
    controller.deleteCosmo(req, res);
  }
);

app.put("/offline", async (req, res) => {
  controller.offline(req, res);
});

module.exports = app;
