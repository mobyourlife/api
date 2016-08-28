'use strict';

import Boom from 'boom';
import { User } from '../../models';
import { ListPages } from './shared/list-pages';

export const UserMePagesList = {
  method: 'GET',
  path: '/me/pages',
  config: {
    description: 'Lista todas as páginas do usuário autenticado.',
    tags: ['api'],
    handler: (req, res) => {
      ListPages(req.auth.credentials.id)
        .then(pages => {
          res(pages).code(200);
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
