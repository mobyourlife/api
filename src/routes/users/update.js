'use strict';

import Boom from 'boom';
import { User } from '../../models';
import { UserUpdateDto } from '../../dtos';
import { verifyCredentials } from '../../utils';

export const UsersUpdate = {
  method: 'PATCH',
  path: `/{id}`,
  config: {
    description: 'Altera as informações de um usuário.',
    tags: ['api'],
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
      payload: UserUpdateDto.Payload(),
      params: UserUpdateDto.Parameters()
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
