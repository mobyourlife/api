'use strict'

import Boom from 'boom'
import { Site } from '../../models'
import { CreateSiteDto } from '../../dtos'

export const CreateSite = {
  method: 'POST',
  config: {
    description: 'Cria um novo site.',
    tags: ['api'],
    handler: (req, res) => {
      const site = new Site()
      site.name = req.payload.name
      site.description = req.payload.description
      // site.sources = {
      //   facebook: [req.payload.account_id]
      // };

      site
        .save({
          name: req.payload.name,
          description: req.payload.description,
          sources: {
            facebook: [
              req.payload.id
            ]
          }
        }, (err, created) => {
          if (err) {
            throw Boom.badRequest(err)
          }
          if (!created) {
            throw Boom.badRequest('Site not created!')
          }
          res(created).code(201)
        })
    },
    validate: {
      payload: CreateSiteDto.Payload()
    }
  }
}
