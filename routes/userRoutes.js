'use strict';
var express = require('express');
var userController = require('../controllers/userController');

var api = express.Router();

api.get('/probando-controlador', userController.pruebas);
api.post('/register', userController.saveUser);

module.exports = api;
