'use strict'

require('dotenv').load()

module.exports = {

  api: {
    hostBaseUrl: 'http://localhost:3000/api/v1'
  },

  assets: {
    dir: 'static-dist',
    host: 'http://localhost:4200'
  },

  env: process.env.NODE_ENV,

  envs: {
    dev: 'development',
    prod: 'production'
  },

  port: process.env.PORT || 4200

}
