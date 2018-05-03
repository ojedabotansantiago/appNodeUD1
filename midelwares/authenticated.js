'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');
var constats = require ('../constantes/constants');

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
      return res.status(403).send({
        mesage: 'la peticion no esta autenticada'
      });
  }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, constats.SECRET_W);
        if (payload.exp <= moment().unix()) {
            return res.status(404);send({message: 'token caducado'});

        }
    } catch (ex) {
        console.log(ex);
        return res.status(404);send({message: 'token no valido'});
    }
    req.user= payload;

    next();
};