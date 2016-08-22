'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  fb_uid: Joi.string(),
  email: Joi.string().email(),
  admin: Joi.boolean()
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
};
