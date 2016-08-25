'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema({
  fb_uid: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: false, index: { unique: true }},
  name: { type: String, required: false },
  admin: { type: Boolean, required: true }
});

export const User = mongoose.model('User', UserModel);
