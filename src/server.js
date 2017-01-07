import Hapi from 'hapi'

import { HelloName } from './routes/hello'

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
]

routes.forEach(routeConfig => server.route(routeConfig))

server.start(() => {
  console.log('Hapi running...')
})
