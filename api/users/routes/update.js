'use strict';

const Boom = require('boom');
const User = require('../models/user');
const updateUserSchema = require('../schemas/updateUser');
const verifyCredentials = require('../utils/userFunctions').verifyCredentials;
const route = require('resolve-route')(__dirname, '..');

module.exports = {
  method: 'PATCH',
  path: `/${route}/{id}`,
  config: {
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      const id = req.params.id;
      User
        .findOneAndUpdate({ _id: id }, req.pre.user, (err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!user) {
            throw Boom.notFound('User not found!');
          }
          res({ message: 'User updated!' });
        });
    },
    validate: {
      payload: updateUserSchema.payloadSchema,
      params: updateUserSchema.paramsSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};