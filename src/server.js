require('dotenv').config();
require("./database/index.js");

const routes = require('./routes.js')
const express = require('express')
const app = express()

app.use(express.json());

//usando as nossa rotas
app.use(routes)

const port = process.env.PORT || 3000;


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))