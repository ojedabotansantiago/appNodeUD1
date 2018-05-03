'use strict'
var express = require('express');
var artistController = require('../controllers/artistController');
var md_auth = require('../midelwares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/artist'});

var api = express.Router();

api.get('/get-artist/:id',md_auth.ensureAuth, artistController.getArtist);
api.post('/save-artist',md_auth.ensureAuth, artistController.saveArtist);
api.get('/get-artists/:page?',md_auth.ensureAuth, artistController.getArtists);
api.put('/update-artist/:id',md_auth.ensureAuth, artistController.updateARtist);
api.delete('/delete-artist/:id',md_auth.ensureAuth, artistController.deleteARtist);
api.post('/upload-image-artist/:id', md_auth.ensureAuth, md_upload, artistController.uploadedArtistImage);
api.get('/get-image-artist/:imageFile', md_auth.ensureAuth, md_upload, artistController.getImageArtistFiles);



module.exports = api;