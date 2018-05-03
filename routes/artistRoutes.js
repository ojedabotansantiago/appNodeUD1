'use strict'
var express = require('express');
var artistController = require('../controllers/artistController');
var md_auth = require('../midelwares/authenticated');

var api = express.Router();

api.get('/get-artist/:id',md_auth.ensureAuth, artistController.getArtist);
api.post('/save-artist',md_auth.ensureAuth, artistController.saveArtist);
api.get('/get-artists/:page?',md_auth.ensureAuth, artistController.getArtists);
api.put('/update-artist/:id',md_auth.ensureAuth, artistController.updateARtist);
api.put('/delete-artist/:id',md_auth.ensureAuth, artistController.deleteARtist);


module.exports = api;