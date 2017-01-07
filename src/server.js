import Hapi from 'hapi'

const server = new Hapi.Server()
server.connection({port: 4000})

server.route({
  method: 'GET',
  path: '/hello/{name*}',
  handler: (req, reply) => {
    reply(`Hello ${req.params.name}!`)
  }
})

server.start(() => {
  console.log('Hapi running...')
})
