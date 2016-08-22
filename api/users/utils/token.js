'use strict';

const jwt = require('jsonwebtoken');
const CONFIG = require('../../../config');

function createToken(user) {
  let scopes;

  if (user.admin) {
    scopes = 'admin';
  }

  return jwt.sign({
    id: user._id,
    username: user.fb_uid,
    scope: scopes
  }, CONFIG.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h'
  });
}

module.exports = createToken;
