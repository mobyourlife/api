'use strict';

const request = require('https');
const qs = require('querystring');

const API_URL = 'https://graph.facebook.com/v2.7';

function validateUser(fb_uid, access_token) {
  return new Promise((resolve, reject) => {
    let params = qs.stringify({
      fields: 'id,name,email',
      access_token: access_token
    });
    let url = `${API_URL}/me?${params}`;

    request
      .get(url, res => {
        const body = [];
        res.on('data', chunk => body.push(chunk));
        res.on('end', () => {
          const json = JSON.parse(body.join(''));

          if (res.statusCode < 200 || res.statusCode > 299) {
            reject(json);
          } else if (json.id === fb_uid) {
            resolve(json);
          } else {
            reject({ error: 'Invalid Facebook credentials!' });
          }
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports = {
  validateUser: validateUser
};
