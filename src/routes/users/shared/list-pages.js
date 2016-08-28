'use strict';

import { User } from '../../../models';

export function ListPages(userId) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ _id: userId })
      .select('-password -__v')
      .exec((err, user) => {
        if (err) {
          reject({
            status: 400,
            message: 'Unable to query user pages!'
          });
          return;
        }
        if (!user) {
          reject({
            status: 404,
            message: 'User not found!'
          });
          return;
        }
        const pages = user.accounts.map(i => {
          return {
            account_id: i.account_id,
            name: i.name
          };
        });
        resolve(pages);
      });
  });
}
