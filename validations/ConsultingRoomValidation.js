const check = require('joi');

exports.createConsultingRoom = check.object({
name: check.string().max(255).required(),
description: check.string().max(255).required(),
machines: check.string().max(255).required(),
});