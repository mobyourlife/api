'use strict'

import Joi from 'joi'

export class CreateSiteDto {
  static Payload () {
    return Joi.object({
      account_id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required()
    })
  }
}
