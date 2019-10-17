const express = require('express');
const LevelController = require('./controllers/level');

const routes = express.Router();

routes.get('/level', LevelController.index);

module.exports = routes;