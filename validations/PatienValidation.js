const Joi = require('@hapi/joi');

module.exports = {
    // Function to validate user data
    patient: data => {
        let schema = Joi.object({
            name: Joi.string(),
            sex: Joi.string(),
            age: Joi.number(),
            curp: Joi.string().max(18),
            birthdate: Joi.date(),
            civilstatus: Joi.string(),
            religion: Joi.string(),
            ocupation: Joi.string(),
            address: Joi.string(),
            email: Joi.string()
                .email(),
            phone: Joi.number(),
            emergencyContact: Joi.number(),
            bloodType: Joi.string()
        });
        return schema.validate(data);
    }
};