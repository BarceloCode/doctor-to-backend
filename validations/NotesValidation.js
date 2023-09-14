const Joi = require('@hapi/joi');

module.exports = {
    notes: data =>{
        let schema = Joi.object({
            patient: Joi.string().required(),
            description: Joi.string().required().max(1025),
            date: Joi.string().required()
        })
        return schema.validate(data);
    }
}