const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rotas = require('../app/rotas');
app.use(bodyParser.json())
rotas(app);

module.exports = app;