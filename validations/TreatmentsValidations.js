const Joi = require('@hapi/joi');

module.exports = {
    treatments: data =>{
        let schema = Joi.object({
            treatmentName: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            product: Joi.string().required()            
        })
        return schema.validate(data);
    }
}