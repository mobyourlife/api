import Mongoose from 'mongoose'

const PageModel = new Mongoose.Schema({
  fb_account_id: {type: String, required: true},
  name: {type: String, required: true},
  active: {type: Boolean},
  about: {type: String},
  category: {type: String, required: true},
  category_list: [{type: String}],
  picture: {type: String, required: false},
  cover: {
    type: {
      cover_id: {type: String, required: true},
      offset_x: {type: Number, required: true},
      offset_y: {type: Number, required: true},
      source: {type: String, required: true},
      id: {type: String, required: true},
    },
    required: false
  },
  emails: [{type: String, required: true}],
  engagement: {
    count: {type: Number, required: false},
    social_sentence: {type: String}
  },
  fan_count: {type: Number, required: false},
  is_published: {type: Boolean},
  is_verified: {type: Boolean},
  is_webhooks_subscribed: {type: Boolean},
  link: {type: String, required: false},
  location: {
    city: {type: String},
    country: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    state: {type: String},
    street: {type: String},
    zip: {type: String}
  },
  overall_star_rating: {type: Number},
  phone: {type: String},
  rating_count: {type: Number},
  talking_about_count: {type: Number},
  verification_status: {type: String},
  voip_info: {
    has_permission: {type: Boolean},
    has_mobile_app: {type: Boolean},
    is_pushable: {type: Boolean},
    is_callable: {type: Boolean},
    is_callable_webrtc: {type: Boolean},
    reason_code: {type: Number},
    reason_description: {type: String}
  },
  were_here_count: {type: Number},
  log: {
    check_page: {type: Date},
    last_modified: {type: Date},
    build_updated: {type: Date},
    check_albums: {type: Date},
    build_queued: {type: Date},
    check_feed: {type: Date},
    last_built: {type: Date},
    domain_changed: {type: Date}
  },
  custom: {
    title: {type: String},
    theme_name: {type: String}
  },
  admin: {
    domain: {type: String},
    analytics_id: {type: String}
  }
})

export const Page = Mongoose.model('Page', PageModel)
