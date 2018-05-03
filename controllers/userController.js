'use strict';

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var datoGuardado = require('../midelwares/authenticated');
var jwt = require('../services/jwt');
var Promise = require('bluebird');

function pruebas(req, res) {
  res.status(200).send({
    message:
      'probando una accion del controlador de usuarios del appi rest con node'
  });
}

function saveUser(req, res) {
  var user = new User();

  var params = req.body;
  console.log(params);
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if (params.password) {
    bcrypt.hash(params.password, null, null, function(err, hash) {
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        //guardar user
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: 'error al guardar el usuario' });
          } else {
            if (!userStored) {
              res
                .status(404)
                .send({ message: 'no se ha registrado el usuario' });
            } else {
                console.log('password :' + userStored);
                
              res.status(200).send({ message: 'todo bien', user: userStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: 'introduce todos los campos' });
      }
    });
  } else {
    res.status(200).send({ message: 'introduce pwd' });
  }
}

function loginUser(req, res) {
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'error en la peticion' });
    } else {
      if (!user) {
        res.status(404).send({ message: 'el usuario no existe' });
      } else {
        console.log('usuario: ' + user);
        //console.log(password);
        //comprobar contraseña
        bcrypt.compare(password, user.password, (err, check) => {       
          if (check) {
            //devolver los datros del usuario logead
            if (params.gethash) {
              //devolber toquen jwt
              res.status(200).send({ 
                token: jwt.createToken(user)
               });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ message: 'contraseña incorrecta' });
          }
        });
      }
    }
  });
}
function findUser(id, res) {
  let _id = '_id';
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      let message = 'error en la peticion';
      return message;
    } else {
      if (!user) {
        let message = 'error en la peticion';
        return message;
      } else {
        console.log('usuario: ' + user);
        res.status(200).send({ user: user });
      }
    }
  });
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId,update,(err, userUpdated) => {
    if (err) {
      res.status(500).send({message: 'error al actulaizar el usuario'});
    }
    else if (!userUpdated) {
      res.status(404).send({message: 'no se a podido actulaizar el usuario'});
    }else {
      findUser(userId, res);      
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser
};
