'use strict';

import Joi from 'joi';
import ObjectId from 'joi-objectid';

Joi.objectId = ObjectId(Joi);

export class UserUpdateDto {
  static Payload() {
    return Joi.object({
      fb_uid: Joi.string(),
      email: Joi.string().email(),
      admin: Joi.boolean()
    });
  }

  static Parameters() {
    return Joi.object({
      id: Joi.objectId().required()
    });
  }
}
