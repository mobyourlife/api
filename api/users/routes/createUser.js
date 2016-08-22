'use strict';

const Boom = require('boom');
const User = require('../models/user');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../utils/userFunctions').verifyUniqueUser;
const createToken = require('../utils/token');

module.exports = {
  method: 'POST',
  path: '/users',
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueUser }
    ],
    handler: (req, res) => {
      let user = new User();
      user.fb_uid = req.payload.fb_uid;
      user.email = req.payload.email;
      user.admin = false;
      user.save((err, user) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        res({ id_token: createToken(user) }).code(201);
      });
    },
    validate: {
      payload: createUserSchema
    }
  }
};
