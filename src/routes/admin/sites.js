'use strict'

import { Page } from '../../models'

export const AdminSitesList = {
  method: 'GET',
  path: '/sites',
  config: {
    description: 'Lista todos os sites cadastrados no sistema.',
    tags: ['api'],
    handler: (req, res) => {
      ListSites()
        .then(sites => {
          res(sites).code(200)
        })
        .catch(err => {
          res(err).code(err.status)
        })
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}

function ListSites () {
  return new Promise((resolve, reject) => {
      Page
        .find({active: true})
        .sort({name: 1})
        .select('-__v')
        .exec((err, list) => {
          if (err) {
            reject({
              status: 400,
              message: 'Unable to query all sites list!'
            })
            return
          }

          const sites = list.map(i => {
            return {
              id: i._id,
              name: i.name,
              description: i.about,
              picture: i.picture
            }
          })
          resolve(sites)
        })
    })
}
