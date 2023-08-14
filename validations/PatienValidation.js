const check = require('joi');

exports.patient = check.object({
   name: check.string().max(255).required(),
   age: check.integer().max(120).required(),
   sex: check.string().max(55).required(),
   curp: check.string().max(18).required().pattern(new RegExp('/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/')),
   allergies: check.string().max(255)
});