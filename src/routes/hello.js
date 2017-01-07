import Joi from 'joi'

export const HelloName = {
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
}
