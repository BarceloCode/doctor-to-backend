const Joi = require('@hapi/joi');

module.exports = {
    // Function to validate user data
    patient: data => {
        let schema = Joi.object({
            name: Joi.string(),
            age: Joi.string(),
            sex: Joi.string(),
            faceImage: Joi.string(),
            curp: Joi.string()
                  .required(),
            allergies: Joi.string(),
            freqD: Joi.string(),
            freqS: Joi.string(),
            oxygen: Joi.string(),
            signedletter: Joi.string()                                
        });
        return schema.validate(data);
    }
};