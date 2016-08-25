'use strict';

import { User } from '../models';

export function verifyCredentials(req, res) {
  User.findOne({
    fb_uid: req.payload.fb_uid
  }, (err, user) => {
    res(user);
  });
}
