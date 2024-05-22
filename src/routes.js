const { Router } = require('express')
const UserModel = require('./apps/models/User')
const routes = new Router();

routes.get("/users", async (req, res) => {
    const users = await UserModel.findAll();
    res.send({ users: users })
});

routes.get('/health', (req, res) => {
    res.send({ message: "Conectado com sucesso" })
})


module.exports = routes;