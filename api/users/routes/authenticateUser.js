'use strict';

const Boom = require('boom');
const User = require('../models/user');
const authenticateUserSchema = require('../schemas/authenticateUser');
const verifyCredentials = require('../utils/userFunctions').verifyCredentials;
const createToken = require('../utils/token');

module.exports = {
  method: 'POST',
  path: '/users/authenticate',
  config: {
    auth: false,
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      res({ id_token: createToken(req.pre.user) }).code(201);
    },
    validate: {
      payload: authenticateUserSchema
    }
  }
};
