'use strict'

var EventEmitter = require('events').EventEmitter
var isEmpty = require('lodash-node/modern/objects/isEmpty')
var merge = require('react/lib/merge')

var AppConstants = require('../common/app-constants')
var AppDispatcher = require('../common/app-dispatcher')
var BooksApi = require('./books-api')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')

var _book = {}

var _destroyed = false

var BooksShowStore = merge(EventEmitter.prototype, {

  get() {
    return _book
  },

  hasBook() {
    return _book && !isEmpty(_book)
  },

  isDestroyed() {
    return _destroyed
  },

  emitChange() {
    this.emit(AppConstants.Events.CHANGE, arguments)
  },

  addChangeListener(callback) {
    this.on(AppConstants.Events.CHANGE, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(AppConstants.Events.CHANGE, callback)
  }
})

BooksShowStore.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action

  switch(action.type) {

    case BooksConstants.ActionTypes.SHOW:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      _book = BooksStore.find(action.filter) || {}
      BooksShowStore.emitChange()
      break

    case BooksConstants.ActionTypes.FETCH_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      if (action.filter && action.filter.id)
        _book = BooksStore.find(action.filter) || {}
      BooksShowStore.emitChange()
      break

    case BooksConstants.ActionTypes.DESTROY_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      _book = {}
      _destroyed = true
      BooksShowStore.emitChange()
      break

    case AppConstants.ActionTypes.TRANSITION:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])

      var foundBooks = BooksStore.find(action.routeState.params)
      var isBooksRoute = !!action.routeState.path.match(/\/books/);
      if (!foundBooks && isBooksRoute)
        BooksApi.fetch(null, action.routeState.params)

      _book = foundBooks || {}
      BooksShowStore.emitChange()
      break

  }
})

module.exports = BooksShowStore