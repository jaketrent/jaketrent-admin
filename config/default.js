'use strict'

require('dotenv').load()

module.exports = {

  assets: {
    host: 'http://localhost:4200'
  },

  env: process.env.NODE_ENV,

  envs: {
    dev: 'development',
    prod: 'production'
  },

  port: process.env.PORT || 3000

}
