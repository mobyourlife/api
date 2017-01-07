'use strict';

import Joi from 'joi';

export class LoginDto {
  static Payload() {
    return Joi.object({
      fb_uid: Joi.string().required(),
      access_token: Joi.string().required()
    });
  }
}
