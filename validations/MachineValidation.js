const check = require('joi');

exports.createMachine = check.object({
name: check.string().max(255).required(),
description: check.string().max(255).required()
});