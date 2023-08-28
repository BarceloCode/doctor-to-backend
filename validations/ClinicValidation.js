const check = require('joi');

exports.createClinic = check.object({
name: check.string().max(255).required(),
adress: check.string().max(255).required(),
start: check.string().required(),
end: check.string().required(),
phone: check.string().max(10).required(),
});
