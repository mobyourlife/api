'use strict'

import Boom from 'boom'

import { User } from '../models'

export function getLoggedInUser (req, res) {
  if (!req.auth || !req.auth.isAuthenticated) {
    res(null)
  } else {
    const id = req.auth.credentials.id
    User.findOne({_id: id}, (err, user) => {
      if (err) {
        throw Boom.forbidden(err)
      } else {
        res(user)
      }
    })
  }
}

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
