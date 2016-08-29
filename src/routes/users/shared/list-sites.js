'use strict';

import { Site, User } from '../../../models';

export function ListSites(userId) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ _id: userId })
      .select('id, sites')
      .exec((err, user) => {
        if (err) {
          reject({
            status: 400,
            message: 'Unable to query user sites!'
          });
          return;
        }
        if (!user) {
          reject({
            status: 404,
            message: 'User sites not found!'
          });
          return;
        }

        Site
          // .find({ _id: { $in: user.sites } })
          .find()
          .select('-__v')
          .exec((err, list) => {
            if (err) {
              reject({
                status: 400,
                message: 'Unable to query sites list!'
              });
              return;
            }
            
            const sites = list.map(i => {
              console.log(i);
              return {
                id: i._id,
                name: i.name,
                description: i.description
              };
            });
            resolve(sites);
          });
      });
  });
}
