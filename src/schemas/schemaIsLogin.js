import Joi from "joi";

const schemaIsLogin = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required()
    

})


export default schemaIsLogin;