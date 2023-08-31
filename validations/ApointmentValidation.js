const check = require('joi');

exports.createApointment = check.object({
date: check.date().required(),
description: check.string().max(255).required(),
cosmetologist: check.string().min(20).max(100).required(),
patient: check.string().min(20).max(100).required(),
treatment: check.array().min(20).max(100).required(),
});

exports.checkforUpte = check.object({
    _id: check.string().min(20).max(100).required(),
    description: check.string().max(255).required(),
    cosmetologist: check.string().min(20).max(100).required(),
    treatment: check.array().max(20).required(),
});

exports.checkID = check.object({
    _id: check.string().min(20).max(100).required(),
    });