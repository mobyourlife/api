'use strict'

import { User } from '../../models'
import { LoginDto } from '../../dtos'
import { verifyCredentials, createToken, validateUser } from '../../utils'

export const UsersLogin = {
  method: 'POST',
  config: {
    description: 'Tenta efetuar autenticação via Facebook.',
    tags: ['api'],
    auth: false,
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      if (req.pre.user) {
        validateUser(req.payload.fb_uid, req.payload.access_token)
          .then(data => {
            User.findOne({fb_uid: req.payload.fb_uid}).then(user => {
              user = updateUserData(user, data)
              user.save((err, user) => {
                if (err) {
                  res({message: 'Failed to update user data!'}).code(400)
                } else {
                  res({ id_token: createToken(req.pre.user), user }).code(200)
                }
              })
            })
          })
      } else {
        validateUser(req.payload.fb_uid, req.payload.access_token)
          .then(data => {
            let user = new User()
            user.fb_uid = req.payload.fb_uid
            user.admin = false
            user = updateUserData(user, data)

            user.save((err, user) => {
              if (err) {
                res({ message: 'User already registered!' }).code(400)
              } else {
                res({ id_token: createToken(user), user }).code(201)
              }
            })
          }, (err) => {
            res(err).code(400)
          })
      }
    },
    validate: {
      payload: LoginDto.Payload()
    }
  }
}

function updateUserData(user, data) {
  user.email = data.profile.email
  user.name = data.profile.name

  if (data.profile.picture && !data.profile.picture.data.is_silhouette) {
    user.picture = data.profile.picture.data.url
  }

  user.accounts = data.accounts.data.map(i => {
    return {
      account_id: i.id,
      name: i.name,
      about: i.about,
      category: i.category,
      category_list: i.category_list,
      access_token: i.access_token,
      perms: i.perms,
      picture: (i.picture && !i.picture.data.is_silhouette) ? i.picture.data.url : null,
      cover: i.cover
    }
  })
  return user
}
