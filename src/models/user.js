'use strict';

import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const UserModel = new Schema({
  fb_uid: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: false, index: { unique: true }},
  name: { type: String, required: false },
  admin: { type: Boolean, required: true }
});

export const User = Mongoose.model('User', UserModel);
