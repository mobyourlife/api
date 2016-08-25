'use strict';

import Boom from 'boom';
import { User } from '../../models';
import { LoginDto } from '../../dtos';
import { verifyCredentials, createToken, validateUser } from '../../utils';

export const UsersLogin = {
  method: 'POST',
  config: {
    auth: false,
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      if (req.pre.user) {
        res({ id_token: createToken(req.pre.user) }).code(200);
      } else {
        validateUser(req.payload.fb_uid, req.payload.access_token)
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
      }
    },
    validate: {
      payload: LoginDto.Payload()
    }
  }
};
