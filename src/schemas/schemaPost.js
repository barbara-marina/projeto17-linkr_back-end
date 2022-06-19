import joi from 'joi';

const schemaPost = joi.object({
    url: joi.string().uri().required(),
    description: joi.string().allow('')
});

export default schemaPost;