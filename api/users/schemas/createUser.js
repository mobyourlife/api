'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  fb_uid: Joi.string().required(),
  email: Joi.string().email()
});

module.exports = createUserSchema;
