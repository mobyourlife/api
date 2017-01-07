'use strict';

import Boom from 'boom';
import { User } from '../../models';
import { ListSites } from './shared/list-sites';

export const UserMeSitesList = {
  method: 'GET',
  path: '/me/sites',
  config: {
    description: 'Lista todos os sites do usuário autenticado.',
    tags: ['api'],
    handler: (req, res) => {
      ListSites(req.auth.credentials.id)
        .then(sites => {
          res(sites).code(200);
        })
        .catch(err => {
          res(err).code(err.status);
        });
    },
    auth: {
      strategy: 'jwt'
    }
  }
}
