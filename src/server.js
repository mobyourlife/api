import Hapi from 'hapi'
import Mongoose from 'mongoose'

import { HelloName } from './routes/hello'
import { SitesList } from './routes/sites'

const MOB_MONGO_FACEBOOK_DATABASE = process.env.MOB_MONGO_FACEBOOK_DATABASE || 'mongodb://localhost:27017/mobyourlife'

const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 4000,
  routes: {
    cors: true
  }
})

const routes = [
  HelloName,
  SitesList,
]

routes.forEach(routeConfig => server.route(routeConfig))

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
