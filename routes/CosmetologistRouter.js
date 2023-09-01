const express = require("express");
const app = express.Router();
const controller = require("../controllers/CosmotologistController");
const CosmoValidation = require("../validations/CosmotologistValidation");
const { validate } = require("../middlewares/validations");




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

app.put("/offline", async (req, res) => {
  controller.offline(req, res);
});

app.get("/get", async (req, res) => {
  controller.getAllCosmo(req, res);
});

app.put(
  "/update/:email",
  validate(CosmoValidation.updateCosmotologist),
  async (req, res) => {
    controller.updateCosmo(req, res);
  }
);

app.put(
  "/updateworkdays/:email",
  validate(CosmoValidation.checkWorkdays),
  async (req, res) => {
    controller.updateWorktimeAndDays(req, res);
  }
);

app.delete(
  "/delete",
  validate(CosmoValidation.deleteCosmologist),
  async (req, res) => {
    controller.deleteCosmo(req, res);
  }
);

app.delete(
  "/restore",
  validate(CosmoValidation.deleteCosmologist),
  async (req, res) => {
    controller.undoDeleteCosmo(req, res);
  }
);



module.exports = app;
