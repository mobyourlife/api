'use strict'

import Joi from 'joi'

export class CreateSiteDto {
  static Payload () {
    return Joi.object({
      fb_uid: Joi.string().required(),
      account_id: Joi.string().required()
    })
  }
}
