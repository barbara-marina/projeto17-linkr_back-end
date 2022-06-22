import joi from 'joi';

const schemaPostEdited = joi.object({
    description: joi.string().allow('')
});

export default schemaPostEdited;