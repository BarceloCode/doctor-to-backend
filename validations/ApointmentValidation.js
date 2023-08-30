const check = require('joi');

exports.createApointment = check.object({
date: check.date().required(),
description: check.string().max(255).required(),
cosmetologist: check.string().max(255).required(),
patient: check.string().max(255).required(),
treatment: check.array().max(255).required(),
});

exports.checkID = check.object({
    _id: check.string().min(20).max(100).required(),
    });