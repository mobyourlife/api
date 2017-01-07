import Hapi from 'hapi'
import Mongoose from 'mongoose'
import Jwt from 'hapi-auth-jwt'

import {
  SitesRoutes,
  UsersRoutes
} from './routes'

const MOB_MONGO_FACEBOOK_DATABASE = process.env.MOB_MONGO_FACEBOOK_DATABASE || 'mongodb://localhost:27017/mobyourlife'

// Setup server
const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 4000,
  routes: {
    cors: true
  }
})

// Setup plugins
server.register([
  Jwt
], err => {
  if (err) {
    throw err
  }

  // Setup JWT as auth strategy
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: process.env.JWT_SECRET,
    verifyOptions: {algorithms: ['HS256']}
  })

  // Setup routes
  registerRoutes(server, '/sites', SitesRoutes)
  registerRoutes(server, '/users', UsersRoutes)
})

// Start server
server.start(() => {
  console.log('Hapi running...')

  Mongoose.Promise = global.Promise
  Mongoose.connect(MOB_MONGO_FACEBOOK_DATABASE, {}, err => {
    if (err) {
      throw err
    }
    console.log('Connected successfully to the database!')
  })
})

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
