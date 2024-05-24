const { Router } = require('express');
const UserSchema = require('./schema/user.schema.json')
const UserController = require('./apps/controllers/userController');
const schemaValidator = require("./apps/middlewares/validator");
const routes = new Router();

routes.post("/user",schemaValidator(UserSchema) , UserController.create);

routes.get('/health', (req, res) => {
    res.send({ message: "Conectado com sucesso" })
})


module.exports = routes;