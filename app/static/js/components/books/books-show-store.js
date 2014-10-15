'use strict'

var EventEmitter = require('events').EventEmitter
var isEmpty = require('lodash-node/modern/objects/isEmpty')
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')

var ActionTypes = BooksConstants.ActionTypes

var _book = {}

var _destroyed = false

var BooksShowStore = merge(EventEmitter.prototype, {

  get: function () {
    return _book
  },

  hasBook: function () {
    return _book && !isEmpty(_book)
  },

  isDestroyed: function () {
    return _destroyed
  },

  emitChange: function () {
    this.emit(AppConstants.Events.CHANGE, arguments)
  },

  addChangeListener: function (callback) {
    this.on(AppConstants.Events.CHANGE, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(AppConstants.Events.CHANGE, callback)
  }
})

BooksShowStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.SHOW:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      _book = BooksStore.find(action.filter) || {}
      BooksShowStore.emitChange()
      break

    case ActionTypes.FETCH_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      if (action.filter && action.filter.id)
        _book = BooksStore.find(action.filter) || {}
      BooksShowStore.emitChange()
      break

    case ActionTypes.DESTROY_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      _book = {}
      _destroyed = true
      BooksShowStore.emitChange()
      break

  }
})

module.exports = BooksShowStore