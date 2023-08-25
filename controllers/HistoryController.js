const HistoryModel = require("../models/HistoryModel");
const TreatmentModel = require("../models/TreatmentModel");
const mongoose = require("mongoose");

module.exports = {
  create: async (req, res) => {
    let history = new HistoryModel({
      patient: req.body.patient,
      treatment: req.body.treatment,
      fecha: req.body.fecha,
    });

    await history
      .save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },

  retrieve: async (req, res) => {
    await HistoryModel.find()
      .populate("patient")
      .populate("treatment")
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },

  retrieveOne: async (req, res) => {
    try {
      const history = await HistoryModel.findById({ _id: req.body._id })
        .populate("patient")
        .populate("treatment");
  
      if (!history) {
        return res.json({ success: false, message: "Historia no encontrada" });
      }
  
      // Tratamiento con datos poblados
      const treatment = history.treatment;
  
      // Ahora, poblamos el campo 'product' en 'treatment'
      const populatedTreatment = await TreatmentModel.populate(treatment, { path: "product" });
  
      res.json({ success: true, result: { history, treatment: populatedTreatment } });
    } catch (error) {
      res.json(error);
    }
  }
  ,
};
