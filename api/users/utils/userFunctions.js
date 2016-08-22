'use strict';

const Boom = require('boom');
const User = require('../models/user');

function verifyUniqueUser(req, res) {
  User.findOne({
    fb_uid: req.payload.fb_uid
  }, (err, user) => {
    if (user) {
      if (user.fb_uid === req.payload.fb_uid) {
        res(Boom.badRequest('Usuário já está registrado!'));
        return;
      }
      if (user.email === req.payload.email) {
        res(Boom.badRequest('Email já está registrado!'));
        return;
      }
    }
    res(req.payload);
  });
}

function verifyCredentials(req, res) {
  User.findOne({
    fb_uid: req.payload.fb_uid
  }, (err, user) => {
    if (user) {
      // TODO: verificar access token na API do Facebook
      // req.payload.access_token
    } else {
      res(Boom.badRequest('Nome de usuário incorreto!'));
    }
    res(user);
  });
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
};
