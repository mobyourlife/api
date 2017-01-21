'use strict'

import Joi from 'joi'
import ObjectId from 'joi-objectid'

Joi.objectId = ObjectId(Joi)

export class SiteUpdateDto {
  static Payload () {
    return Joi.object({
      title: Joi.string().allow('').optional(),
      domain: Joi.string().allow('').optional(),
      analytics_id: Joi.string().allow('').optional()
    })
  }

  static Parameters () {
    return Joi.object({
      id: Joi.objectId().required()
    })
  }
}
