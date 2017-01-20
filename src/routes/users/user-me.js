'use strict'

import { getLoggedInUser } from '../../utils'

export const UserMe = {
  method: 'GET',
  path: '/me',
  config: {
    description: 'Consulta os dados do usuário autenticado.',
    tags: ['api'],
    pre: [
      { method: getLoggedInUser, assign: 'user' }
    ],
    handler: (req, res) => {
      if (!req.pre.user) {
        res().code(403)
      } else {
        res(req.pre.user).code(200)
      }
    },
    auth: {
      strategy: 'jwt'
    }
  }
}
