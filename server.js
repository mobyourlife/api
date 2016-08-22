'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

// Settings
const CONFIG = require('./config');

// Setup server
const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: CONFIG.SERVER_PORT
});

// Setup JWT auth
server.register(require('hapi-auth-jwt'), (err) => {
  // Setup auth strategy
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: CONFIG.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Setup all routes
  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
})

// Start server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at ${server.info.uri}`);
  mongoose.connect(CONFIG.MONGO_URL, {}, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected successfully to the database!');
  });
});
