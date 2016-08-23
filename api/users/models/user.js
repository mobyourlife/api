'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
  fb_uid: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: false, index: { unique: true }},
  name: { type: String, required: false },
  admin: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', UserModel);
