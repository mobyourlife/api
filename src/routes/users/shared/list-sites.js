'use strict';

import { Page, User } from '../../../models';

export function ListSites(userId) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ _id: userId })
      .select('id, accounts')
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

        const userSites = user.accounts
          .map(i => i.account_id)

        Page
          .find({ fb_account_id: { $in: userSites }, active: true })
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
                description: i.about
              };
            });
            resolve(sites);
          });
      });
  });
}
