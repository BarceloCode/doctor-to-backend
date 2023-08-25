const check = require('joi');

exports.createBusinessUnit = check.object({
name: check.string().max(255).required(),
consultingRoom: check.string().max(255).required(),
treatment: check.string().max(255).required(),
});