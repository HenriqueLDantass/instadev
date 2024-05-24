const { Validator } = require('jsonschema');
const v = new Validator();

const schemaValidator = (schema) => (req, res, next) => {
    const result = v.validate(req.body, schema);
    if (!result.valid) {
        // const messageErro = [];
        // for (const item of result.errors) {
        //     messageErro.push(item.message)
        // }


         const messageError = result.errors.map(item => item.message.replace(/"/g, ''));
        return res.status(400).send({ SchemaError: messageError });
    }
    return next();
};

module.exports = schemaValidator;
