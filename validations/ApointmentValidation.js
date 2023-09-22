const check = require("joi");

exports.createApointment = check.object({
  space_id: check.string().min(20).max(100).required(),
  blockId: check.string().min(20).max(100).required(),
  date: check
    .string()
    .max(10)
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": 'La fecha debe estar en el formato "DD-MM-YYYY"',
      "any.required": "El campo de fecha es obligatorio",
      "string.max": "La fecha no debe tener más de {#limit} caracteres",
    }),
  description: check.string().max(255).required(),
  cosmetologist: check.string().min(20).max(100).required(),
  patient: check.string().min(20).max(100).required(),
  treatment: check.array().min(1).max(10).required(),
});

exports.checkforUpte = check.object({
  _id: check.string().min(20).max(100).required(),
  description: check.string().max(255).required(),
  cosmetologist: check.string().min(20).max(100).required(),
  treatment: check.array().max(20).required(),
});

exports.checkFieldsAvaibleSpaces = check.object({
  cosmetologist: check.string().min(20).max(100).required(),
  date: check
    .string()
    .max(10)
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": 'La fecha debe estar en el formato "DD-MM-YYYY"',
      "any.required": "El campo de fecha es obligatorio",
      "string.max": "La fecha no debe tener más de {#limit} caracteres",
    }),
});

exports.checkID = check.object({
  _id: check.string().min(20).max(100).required(),
});

exports.currentPage = check.object({
  page: check.number().min(1).required(),
});

exports.ApointmentManagmentArray = check.object({
  treatment: check
    .array()
    .items(check.string().min(20).max(100))
    .unique()
    .required(),
});
