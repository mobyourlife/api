'use strict';

import Boom from 'boom';
import { User } from '../../models';

export const UsersList = {
  method: 'GET',
  config: {
    description: 'Lista todos os usuários cadastrados.',
    tags: ['api'],
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
