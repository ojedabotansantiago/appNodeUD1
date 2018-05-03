'use strict'

var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');

function getArtist(req, res) {

    var artistName = req.params.name;
    Artist.findOne({artistName: artistName},(err, artist) => {
        if (err) {
            res.status(500).send({message: 'error al buscar el artista'});
        }
        if (!artist) {
            res.status(404).send({message: 'no existe el artista'});
        }
            res.status(200).send({message: 'bien artista',artist: artist});

    });
}

function saveArtist(req,res) {
    var artist = new Artist();
    artist.name = req.body.name;
    artist.description = req.body.description;
    artist.image = 'null';
    artist.save((err, artistStored)=>{
        if (err) {
            res.status(500).send({message: 'error al guardar el artista'});
        }
        if (!artistStored) {
            res.status(404).send({message: 'error al guardar el artista'});
        }
        res.status(200).send({artist: artistStored});
    })
}

function getArtists(req, res) {
    var page = parseInt(req.params.page);
    var itemsPerPage = parseInt(req.headers.itemsperpage); 
    Artist.find().sort('name').paginate(page, itemsPerPage,(err, artists, total) => {
        if (err) {
        res.status(500).send({message: 'error en la peticion de buscar artistas'});
        }
        if (!artists) {
          res.status(500).send({message: 'no hay artistas'});  
        }
        res.status(200).send({
            pages: total,
            artists: artists
        });
    })

}

function findartist(id, res) {
  let _id = '_id';
  Artist.findOne({ _id: id }, (err, artist) => {
    if (err) {
        let message = 'error en la peticion';
        res.status(500).send({ message });
    } else {
      if (!artist) {
        let message = 'error en la peticion';
        res.status(400).send({ message });
      } else {
        console.log('artista: ' + artist);
        res.status(200).send({ artist: artist });
      }
    }
  });
}

function updateARtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;
    Artist.findByIdAndUpdate(artistId, update, (err,artisUpdated) => {
        if (err) {
            res.status(500).send({message: 'error al modificar un artista'});
        }
        if (!artisUpdated) {
            res.status(400).send({message: 'no existe el artista'});
        }        
        findartist(artistId, res);
    })
}
 function deleteARtist(req, res) {
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId,(err, artistRemoved) =>{
        if (err) {
            res.status(500).send({message: 'error al elimiinar un artista'});            
        }
        if (!artistRemoved) {
            res.status(500).send({message: 'no se ha encontrado el artista a eliminar'});            
        }
        Album.find({artista: artistRemoved._id}).remove((err, albumRemoved) => {
            if (err) {
                res.status(500).send({message: 'error al elimiinar un album'});            
            }
            if (!albumRemoved) {
                res.status(500).send({message: 'no se ha encontrado el el album a eliminar'});            
            }
            Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                if (err) {
                    res.status(500).send({message: 'error al elimiinar un cancion'});            
                }
                if (!songRemoved) {
                    res.status(500).send({message: 'no se ha encontrado el el cancion a eliminar'});            
                }
                res.status(200).send({artistRemoved: artistRemoved, albumRemoved: albumRemoved, songRemoved: songRemoved});
            });
        });
        console.log(artistRemoved);
    })
 }
module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateARtist,
    deleteARtist
}