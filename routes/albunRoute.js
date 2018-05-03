'use strict'
var express = require('express');
var albumController = require('../controllers/albumController');
var md_auth = require('../midelwares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/artist'});

var api = express.Router();

api.get('/get-album',md_auth.ensureAuth, albumController.getAlbum);
api.post('/save-album',md_auth.ensureAuth, albumController.saveAlbum);

module.exports = api;