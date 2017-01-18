'use strict'

import Boom from 'boom'
import { Page, User } from '../../../models'

export function ListPages (userId) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ _id: userId })
      .select('-password -__v')
      .exec((err, user) => {
        if (err) {
          reject({
            status: 400,
            message: 'Unable to query user pages!'
          })
          return
        }
        if (!user) {
          reject({
            status: 404,
            message: 'User not found!'
          })
          return
        }

        let pages = user.accounts.map(i => {
          return {
            account_id: i.account_id,
            name: i.name,
            about: i.about,
            picture: i.picture
          }
        }).sort((a, b) => {
          return a.name.localeCompare(b.name)
        })

        const ids = user.accounts.map(i => i.account_id)
        Page.find({fb_account_id: {$in: ids}, active: true}, {fb_account_id: 1}, (err, found) => {
          if (err) {
            throw Boom.badRequest(err)
          }
          if (found && found.length) {
            const list = found.map(i => i.fb_account_id)
            pages = pages.filter(i => list.indexOf(i.account_id) === -1)
          }
          resolve(pages)
        })
      })
  })
}
