'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
 

/* cargar rutas */
var user_routes = require('./routes/userRoutes')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* configurar  cabezeras http*/

/* rutas base */
app.use('/api', user_routes);

/*
app.get('/pruebas',function (req, res) {
    res.status(200).send({message: 'Bien venido a mi primera api rest en node'})
})
*/

module.exports = app;