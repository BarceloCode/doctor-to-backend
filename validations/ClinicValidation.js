const check = require("joi");

exports.createClinic = check.object({
  name: check.string().max(255).required(),
  description: check.string().max(255).required(),
  address: check.string().max(255).required(),
  worktime: {
    start: check.string().max(255).required(),
    end: check.string().max(255).required(),
    days: check.string().max(255).required(),
  },
});

exports.getClinic = check.object({
    name: check.string().min(10).max(100).required(),
  });

exports.deleteClinic = check.object({
    _id: check.string().min(20).max(100).required(),
  });


