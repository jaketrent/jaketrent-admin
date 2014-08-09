'use strict'

var uuid = require('node-uuid')

exports.gen = function () {
  return uuid.v4().replace(/-/g, '')
}