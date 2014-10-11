'use strict'

var isNumber = require('lodash-node/modern/objects/isNumber')
var flatten = require('lodash-node/modern/arrays/flatten')
var uniq = require('lodash-node/modern/arrays/uniq')

var NO_FILTER_KEY = '*'

module.exports = Cache

function Cache() {
  this.init()
}

Cache.prototype.init = function init() {
  this._cache = {}
  this._cache[NO_FILTER_KEY] = []
}

Cache.prototype.setItem = function setItem(data, filterOrPage, page) {
  var meta = normalizeMetaArgs(filterOrPage, page)
  var filter = meta.filter
  var page = meta.page

  filter = acceptFilterAsStringArray(filter)

  var key = formatFilterKey(data, filter)
  if (!Array.isArray(this._cache[key]))
    this._cache[key] = []

  this._cache[key][page] = data

  return this
}

Cache.prototype.getItem = function getItem(filterOrPage, page) {
  var meta = normalizeMetaArgs(filterOrPage, page)
  var filter = meta.filter
  var page = meta.page

  var key = formatFilterKey(filter, filter)

  if (!Array.isArray(this._cache[key])) return

  return this._cache[key][page]
}

Cache.prototype.removeItem = function removeItem(filterOrPage, page) {
  var meta = normalizeMetaArgs(filterOrPage, page)
  var filter = meta.filter
  var page = meta.page

  var key = formatFilterKey(filter, filter)

  if (!Array.isArray(this._cache[key])) return

  delete this._cache[key][page]

  return this
}

Cache.prototype.getAllItems = function getAllItems(filter) {
  var key = formatFilterKey(filter, filter)

  return uniq(flatten(this._cache[key], true)
    .filter(function (pageData) {
      return pageData
    }))
}

Cache.prototype.clear = function clear() {
  this.init()
}

Cache.prototype.getLastPageNumber = function getLastPageNumber(filter) {
  var key = formatFilterKey(filter, filter)

  if (!Array.isArray(this._cache[key])) return 1

  var lastNonNullPage = 1
  this._cache[key].forEach(function (cachedData, indx) {
    if (Array.isArray(cachedData))
      lastNonNullPage = indx
  })
  return lastNonNullPage
}

Cache.prototype._debugCache = function _debugCache() {
  return this._cache
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

function normalizeMetaArgs(filterOrPage, page) {
  var filter
  if (isNumber(filterOrPage)) {
    page = filterOrPage
    filter = null
  } else {
    filter = filterOrPage
  }

  if (!page)
    page = 1

  return {
    filter: filter,
    page: page
  }
}
