'use strict'

var isNumber = require('lodash-node/modern/objects/isNumber')

exports.cache = cache
exports.get = get
exports.uncache = uncache
exports.clear = clear
exports._debugCache = _debugCache

var NO_FILTER_KEY = '*'
var _cache

init()

function cache(data, filterOrPage, page) {
  var filter
  if (isNumber(filterOrPage)) {
    page = filterOrPage
    filter = null
  } else {
    filter = filterOrPage
  }

  if (!page)
    page = 1

  filter = acceptFilterAsStringArray(filter)

  var key = formatFilterKey(data, filter)
  if (!Array.isArray(_cache[key]))
    _cache[key] = []

  _cache[key][page] = data

  return this
}

function get(filterOrPage, page) {
  var filter
  if (isNumber(filterOrPage)) {
    page = filterOrPage
    filter = null
  } else {
    filter = filterOrPage
  }

  if (!page)
    page = 1

  var key = formatFilterKey(filter, filter)

  if (!Array.isArray(_cache[key])) return

  return _cache[key][page]
}

function uncache(filterOrPage, page) {
  var filter
  if (isNumber(filterOrPage)) {
    page = filterOrPage
    filter = null
  } else {
    filter = filterOrPage
  }

  if (!page)
    page = 1

  var key = formatFilterKey(filter, filter)

  if (!Array.isArray(_cache[key])) return

  delete _cache[key][page]

  return this
}

function clear() {
  init()
}

function formatFilterKey(data, filter) {
  if (!filter) return NO_FILTER_KEY

  if (Array.isArray(data))
    data = data[0]

  return Object.keys(filter).sort().map(function (key) {
    return key + '=' + (data[key] ? data[key].toString() : '')
  }).join('&')
}

function acceptFilterAsStringArray(filter) {
  if (Array.isArray(filter))
    return filter.reduce(function (memo, attrName) {
      memo[attrName] = null
      return memo
    }, {})
  else
    return filter
}

function init() {
  _cache = {}
  _cache[NO_FILTER_KEY] = []
}

function _debugCache() {
  return _cache
}
