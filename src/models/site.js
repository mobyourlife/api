'use strict';

import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const SiteModel = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },

  logs: {
    created: {
      at: { type: Date, required: false },
      by: { type: String, required: false },
    },
  },

  meta: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    keywords: { type: String, required: false },
  },

  sources: {
    facebook: [{
      account_id: { type: String, required: false }
    }],
  },
});

export const Site = Mongoose.model('Site', SiteModel);
