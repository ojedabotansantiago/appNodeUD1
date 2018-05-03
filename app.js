'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/* cargar rutas */
var user_routes = require('./routes/userRoutes');
var artist_routes = require('./routes/artistRoutes');
var album_routes = require('./routes/albunRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* configurar  cabezeras http*/

/* rutas base */
app.use('/api', user_routes,artist_routes,album_routes);


module.exports = app;
