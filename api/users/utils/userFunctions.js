'use strict';

const User = require('../models/user');

function verifyCredentials(req, res) {
  User.findOne({
    fb_uid: req.payload.fb_uid
  }, (err, user) => {
    res(user);
  });
}

module.exports = {
  verifyCredentials: verifyCredentials
};
