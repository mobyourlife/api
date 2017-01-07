import Boom from 'boom'
import Joi from 'joi'

import { Page } from '../models/page'

export const SitesList = {
  method: 'GET',
  path: '/sites',
  handler: (req, reply) => {
    const filter = {active: true}
    const mapping = {name: true}

    Page
    .find(filter, mapping)
    .sort({name: 1})
    .then(docs => {
      reply({sites: docs})
    }, err => {
      throw Boom.badRequest(err)
    })
  }
}
