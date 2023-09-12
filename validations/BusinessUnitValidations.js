const check = require("joi");

exports.BusinessUnit = check.object({
  name: check.string().max(255).required(),
  clinic: check.string().min(20).max(100).required(),
  treatment: check.string().min(20).max(255).required(),
});

exports.UpdateBusinessUnit = check.object({
  _id: check.string().min(20).max(100).required(),
  name: check.string().max(255).required(),
  clinic: check.string().min(20).max(100).required(),
  treatment: check.string().min(20).max(255).required(),
});


exports.AddTreatmentAndClinic = check.object({
    _id: check.string().min(20).max(100).required(),
    treatment: check.array().items(check.string().min(20).max(100)).unique().required(),
    clinic: check.array().items(check.string().min(20).max(100)).unique().required()
  });

exports.checkPage = check.object({
  page: check.number().min(1).required(),
});
