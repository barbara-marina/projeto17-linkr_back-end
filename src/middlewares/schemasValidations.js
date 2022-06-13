
export default function schemasValidations(schema) {
    function validation(req, res, next) {
        const validate = schema.validate(req.body);
        if (validate.error) return res.status(422).send(validate.error.details[0].message);
        next();
    }
    return validation;
}