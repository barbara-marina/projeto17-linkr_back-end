export function schemasValidations(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, {abortEarly: false});
        const {error} = validation;

        if (error) return res.status(422).send(error.details.map(detail => detail.message));
        else next();
    }
}