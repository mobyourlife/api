'use strict'

import Boom from 'boom'
import { Page } from '../../models'
import { CreateSiteDto } from '../../dtos'
import { verifyCredentials } from '../../utils'

export const CreateSite = {
  method: 'POST',
  config: {
    description: 'Cria um novo site.',
    tags: ['api'],
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      const account = req.pre.user.accounts.find(i => i.account_id === req.payload.account_id)
      Page.findOne({fb_account_id: req.payload.account_id}).then(page => {
        if (page) {
          page.name = account.name
          page.category = account.category
          page.picture = account.picture
          page.active = true
          page.save((err, page) => {
            res(page._id).code(200)
          })
          return
        }

        page = new Page()
        page.fb_account_id = req.payload.account_id
        page.name = account.name
        page.category = account.category
        page.picture = account.picture
        page.active = true

        Page.insertMany([page], (err, list) => {
          if (err) {
            throw Boom.badRequest(err)
          }
          if (!list || !list.length) {
            throw Boom.badRequest('Site creation failed!')
          }
          const created = list[0]
          res(created._id).code(201)
        })
      })
    },
    validate: {
      payload: CreateSiteDto.Payload()
    }
  }
}
