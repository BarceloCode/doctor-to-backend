const check = require('joi');

exports.createApointment = check.object({
date: check.date().required(),
description: check.string().max(255).required(),
cosmetologist: check.string().max(255).required(),
clinic: check.string().max(255).required(),
patient: check.string().max(255).required(),
treatment: check.string().max(255).required(),
consultingRoom: check.string().max(255).required(),
});