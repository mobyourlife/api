'use strict'

import jwt from 'jsonwebtoken'

export function createToken (user) {
  let scopes

  if (user.admin) {
    scopes = 'admin'
  }

  return jwt.sign({
    id: user._id,
    username: user.fb_uid,
    scope: scopes
  }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })
}
