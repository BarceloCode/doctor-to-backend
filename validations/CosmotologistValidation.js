const check = require('joi');

exports.cosmotologist = check.object({
    name: check.string().max(255).required(),
    email: check.string().email().max(255).required(),
    full_lastname: check.string().max(255).required(),
    password: check.string().min(8).max(1024).pattern(new RegExp('^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$')).required(),
    passwordConfirmation: check.string().min(8).max(1024).required(),
    phone: check.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required(),
    location: check.string().max(255).required(),
    birthday: check.date().iso({ format: 'YYYY-MM-DD'}).max('now').required(),
    gender: check.string().max(255).required(),
    role: check.string().max(100).required(),    
})