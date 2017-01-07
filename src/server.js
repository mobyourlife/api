import Hapi from 'hapi'
import Joi from 'joi'

const server = new Hapi.Server()
server.connection({port: 4000})

server.route({
  method: 'GET',
  path: '/hello/{name*}',
  config: {
    validate: {
      params: {
        name: Joi.string().min(2).max(40).alphanum().required()
      }
    }
  },
  handler: (req, reply) => {
    reply(`Hello ${req.params.name}!`)
  }
})

server.start(() => {
  console.log('Hapi running...')
})
