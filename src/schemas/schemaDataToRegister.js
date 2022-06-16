import joi from 'joi';

const schemaDataToRegister = joi.object({

    email:joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    picture_url: joi.string().uri().required()

})

export default schemaDataToRegister;