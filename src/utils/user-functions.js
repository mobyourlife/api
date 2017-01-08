'use strict'

import Boom from 'boom'

import { User } from '../models'

export function verifyCredentials (req, res) {
  User.findOne({
    fb_uid: req.payload.fb_uid
  }, (err, user) => {
    if (err) {
      throw Boom.badRequest(err)
    } else {
      res(user)
    }
  })
}
