'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3977;
/*con esto se conecta a la base de datos mongo*/
mongoose.connect('mongodb://localhost:27017/curso_mean2',(err,res)=> {
    if (err) {
        console.log('error al conectar')
        throw err;
    }else{
        console.log('db conection ok');
        app.listen(port, function(){
            console.log('servidor del api rest de musica escuchando en http://localhost:' + port);
        })
    }
});