'use strict'

var uuid = require('node-uuid')

exports.gen = () => {
  return uuid.v4().replace(/-/g, '')
}