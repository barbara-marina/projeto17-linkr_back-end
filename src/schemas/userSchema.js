import joi from 'joi';

const datasToRegisterValidade = joi.object({

    email:joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    picture_url: joi.string().uri().required()

})

export default datasToRegisterValidade