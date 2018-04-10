'use strict';

var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');

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
    bcrypt.hash(params.password,null,null,function (err,hash) {
        user.password = hash;
        if(user.name != null && user.surname != null && user.email != null){
            //guardar user
            user.save((err, userStored)=>{
                if (err) {
                    res.status(500).send({ message: 'error al guardar el usuario' });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: 'no se ha registrado el usuario' });
                    } else {
                        res.status(200).send({ message: 'todo bien', user:userStored });
                    }
                }
            });
        }else {
            res.status(200).send({ message: 'introduce todos los campos' });
        }
    })
  } else {
    res.status(200).send({ message: 'introduce pwd' });
  }
}

module.exports = {
  pruebas,
  saveUser
};
