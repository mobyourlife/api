'use strict';

const Boom = require('boom');
const User = require('../models/user');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../utils/userFunctions').verifyUniqueUser;
const createToken = require('../utils/token');
const route = require('resolve-route')(__dirname, '..');
const facebook = require('../utils/facebook');

module.exports = {
  method: 'POST',
  path: `/${route}`,
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueUser }
    ],
    handler: (req, res) => {
      facebook.validateUser(req.payload.fb_uid, req.payload.access_token)
        .then(data => {
          let user = new User();
          user.fb_uid = req.payload.fb_uid;
          user.email = data.email;
          user.name = data.name;
          user.admin = false;
          user.save((err, user) => {
            if (err) {
              throw Boom.badRequest(err);
            }
            res({ id_token: createToken(user) }).code(201);
          });
        }, (err) => {
          res(err).code(400);
        });
    },
    validate: {
      payload: createUserSchema
    }
  }
};
