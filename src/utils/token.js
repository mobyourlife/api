'use strict';

import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

export function createToken(user) {
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
