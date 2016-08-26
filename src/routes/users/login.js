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
            user.email = data.profile.email;
            user.name = data.profile.name;
            user.admin = false;

            if (data.profile.picture && !data.profile.picture.data.is_silhouette) {
              user.picture = data.profile.picture.data.url;
            }

            user.accounts = data.accounts.data.map(i => {
              return {
                account_id: i.id,
                name: i.name,
                category: i.category,
                category_list: i.category_list,
                access_token: i.access_token,
                perms: i.perms
              };
            });

            user.save((err, user) => {
              if (err) {
                res({ message: 'User already registered!' }).code(400)
              } else {
                res({ id_token: createToken(user) }).code(201);
              }
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
