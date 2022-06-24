import joi from 'joi';

const schemaComment = joi.object({
    postId: joi.number().required(),
    comment: joi.string().min(1).required()
});

export default schemaComment;