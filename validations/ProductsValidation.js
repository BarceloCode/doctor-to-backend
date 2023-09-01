const Joi = require('@hapi/joi');


module.exports = {
    product: data =>{
        let schema = Joi.object({
            productName: Joi.string().required().max(100),
            productPrice: Joi.number().required(),
            stock: Joi.number().required()
        });
        return schema.validate(data);
    }
}

