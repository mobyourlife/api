'use strict'

import Boom from 'boom'
import { Page } from '../../models'

export const GetSite = {
  method: 'GET',
  path: '/{id}',
  config: {
    description: 'Lista todas as páginas do usuário autenticado.',
    tags: ['api'],
    handler: (req, res) => {
      Page.findOne({_id: req.params.id}, (err, site) => {
        if (err) {
          throw Boom.badRequest(err)
        }
        if (!site) {
          res().code(404)
        } else {
          res(site).code(200)
        }
      })
    },
    auth: {
      strategy: 'jwt'
    }
  }
}
