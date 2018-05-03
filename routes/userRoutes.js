'use strict';
var express = require('express');
var userController = require('../controllers/userController');
var md_auth = require('../midelwares/authenticated');
var api = express.Router();

api.get('/probando', md_auth.ensureAuth,userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login',  userController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);


module.exports = api;
