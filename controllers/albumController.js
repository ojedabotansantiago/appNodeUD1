'use strict'

var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');

function getAlbum(req,res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err,album )=> {
        if (err) {
            res.status(500).send({message: 'error en sel servidor'});
        }
        if (!album) {
            res.status(404).send({message: 'no existe el album'});
        }
        res.status(200).send({album: album});
    })
}

function saveAlbum(req, res){
    var album = new Album();
    album.title = req.body.title;
    album.description = req.body.description;
    album.year= req.body.year;
    album.image = 'null';
    album.artist = req.body.artist;

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({message: 'error en sel servidor'});
        }
        if (!albumStored) {
            res.status(404).send({message: 'error album'});
        }
        res.status(200).send({albumStored: albumStored});
    });
};
module.exports = {
    getAlbum,
    saveAlbum
};
