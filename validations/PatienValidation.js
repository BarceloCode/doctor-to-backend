const Joi = require('@hapi/joi');

module.exports = {
    // Function to validate user data
    patient: data => {
        let schema = Joi.object({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            gender: Joi.string().required(),
            age: Joi.string(),
            curp: Joi.string().required().max(18),
            birthdate: Joi.string(),
            civilstatus: Joi.string().required(),
            religion: Joi.string().required(),
            ocupation: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipcode: Joi.string().required(),
            country: Joi.string().required(),
            email: Joi.string().required()
                .email(),
            phone: Joi.string(),
            emergencyContact: Joi.string(),
            bloodType: Joi.string().required(),
            file: Joi.string()
        });
        return schema.validate(data);
    }
};