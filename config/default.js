'use strict'

require('dotenv').load()

module.exports = {

  api: {
    // string of a string for the webpack DefinePlugin
    hostBaseUrl: '"http://localhost:3000/api/v1"'
  },

  env: process.env.NODE_ENV,

  envs: {
    dev: 'development',
    prod: 'production'
  },

  port: process.env.PORT || 4200

}
