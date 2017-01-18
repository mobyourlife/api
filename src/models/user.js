'use strict'

import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const UserModel = new Schema({
  fb_uid: {type: String, required: true, index: {unique: true}},
  email: {type: String, required: false, index: {unique: true}},
  name: {type: String, required: false},
  admin: {type: Boolean, required: true},
  picture: {type: String, required: false},

  accounts: [{
    account_id: {type: String, required: true},
    name: {type: String, required: true},
    about: {type: String, required: false},
    category: {type: String, required: false},
    category_list: {type: String, required: false},
    access_token: {type: String, required: true},
    perms: [{type: String, required: true}],
    picture: {type: String, required: false},
    cover: {
      id: {type: String, required: false},
      cover_id: {type: String, required: false},
      offset_x: {type: Number, required: false},
      offset_y: {type: Number, required: false},
      source: {type: String, required: false},
    },
  }]
})

export const User = Mongoose.model('User', UserModel)
