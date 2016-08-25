import Hapi from 'hapi';
import Mongoose from 'mongoose';
import Bluebird from 'bluebird';
import glob from 'glob';
import path from 'path';

// Settings
import { CONFIG } from './config';

// Routes
import {
  UsersRoutes
} from './routes';

// Setup server
const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: CONFIG.SERVER_PORT,
  routes: {
    cors: true
  }
});

// Setup JWT auth
server.register(require('hapi-auth-jwt'), (err) => {
  if (err) {
    throw err;
  }

  // Setup auth strategy
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: CONFIG.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Setup all routes
  registerRoutes(server, '/users', UsersRoutes);
});

// Start server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}...`);

  Mongoose.Promise = Bluebird;
  Mongoose.connect(CONFIG.MONGO_URL, {}, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected successfully to the database!');
  });
});

// Register routes into the server
function registerRoutes(server, basePath, routes) {
  if (!routes || !Array.isArray(routes)) {
    return;
  }

  routes
    .map(i => {
      i.path = basePath + (i.path || '');
      return i;
    })
    .forEach(i => {
      console.log(`Registering route ${i.method} ${i.path}...`);
      server.route(i);
    });
}
