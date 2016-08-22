'use strict';

const Boom = require('boom');
const User = require('../models/user');
const route = require('resolve-route')(__dirname, '..');

module.exports = {
  method: 'GET',
  path: `/${route}`,
  config: {
    handler: (req, res) => {
      User
        .find()
        .select('-password -__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            throw Boom.notFound('No users found!');
          }
          res(users);
        });
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
