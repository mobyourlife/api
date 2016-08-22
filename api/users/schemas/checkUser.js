'use strict';

const Joi = require('joi');

const checkUserSchema = Joi.object({
  fb_uid: Joi.string()
});

module.exports = checkUserSchema;
