const Joi = require('@hapi/joi');

module.exports = {
    // Function to validate user data
    patient: data => {
        let schema = Joi.object({
            name: Joi.string().required().required(),
            gender: Joi.string().required(),
            age: Joi.string(),
            curp: Joi.string().required().max(18),
            birthdate: Joi.string(),
            civilstatus: Joi.string().required(),
            religion: Joi.string().required(),
            ocupation: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().required()
                .email(),
            phone: Joi.string(),
            emergencyContact: Joi.string(),
            bloodType: Joi.string().required()
        });
        return schema.validate(data);
    }
};