import Hapi from 'hapi';
import Mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';

// Hapi addons
import Jwt from 'hapi-auth-jwt';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';

// Settings
import Pack from '../package';
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

// API documentation options
const options = {
  info: {
    title: 'Documentação da API do Mob Your Life',
    description: Pack.description,
    version: Pack.version
  },
  tags: [
    { name: 'users', description: 'Usuários' }
  ]
};

// Setup JWT auth
server.register([
  Jwt,
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: options
  }
], (err) => {
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

  Mongoose.Promise = global.Promise;
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
