import joi from 'joi';

const schemaPostEdited = joi.object({
    description: joi.string()
});

export default schemaPostEdited;