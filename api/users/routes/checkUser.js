'use strict';

const Boom = require('boom');
const User = require('../models/user');
const checkUserSchema = require('../schemas/checkUser');
const verifyUniqueUser = require('../utils/userFunctions').verifyUniqueUser;

module.exports = {
  method: 'POST',
  path: '/users/check',
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueUser, assign: 'user' }
    ],
    handler: (req, res) => {
      res(req.pre.user);
    },
    validate: {
      payload: checkUserSchema
    }
  }
};
