'use strict'

import request from 'superagent'

const API_URL = 'https://graph.facebook.com/v2.7/'
const PROFILE = [
  {
    'method': 'GET',
    'relative_url': 'me?fields=id,name,email,picture'
  },
  {
    'method': 'GET',
    'relative_url': 'me/accounts?fields=id,name,about,category,category_list,access_token,perms,picture,cover'
  }
]
const BATCH_REQUEST = 'batch=' + JSON.stringify(PROFILE)

export function validateUser (fb_uid, access_token) {
  return new Promise((resolve, reject) => {
    request
      .post(`${API_URL}?access_token=${access_token}`)
      .send(BATCH_REQUEST)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err.response.text)
        } else {
          const ret = res.body.map(i => {
            return JSON.parse(i.body)
          })
          resolve({
            profile: ret[0],
            accounts: ret[1]
          })
        }
      })
  })
}
