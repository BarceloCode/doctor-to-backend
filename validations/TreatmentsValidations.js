const Joi = require('@hapi/joi');

module.exports = {
    treatment: data =>{
        let schema = Joi.object({
            treatmentName: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            product: Joi.string().required()            
        })
        return schema.validate(data);
    }
}