'use strict'

var EventEmitter = require('events').EventEmitter
var isEmpty = require('lodash-node/modern/lang/isEmpty')
var merge = require('react/lib/merge')

var AppConstants = require('../common/app-constants')
var AppDispatcher = require('../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')

var ActionTypes = BooksConstants.ActionTypes

var _book = {}
var _errors = []

function setErrors(errors) {
  if (!errors) {
    _errors = []
    return
  }

  if (!Array.isArray(errors))
    errors = [ errors ]

  _errors = errors.map(function (err) {
    if (!err.hasOwnProperty('id'))
      return {
        id: 'general',
        title: err.message,
        stack: err.stack
      }
    else
      return err
  })
}

var _persisted = false

var BooksUpdateStore = merge(EventEmitter.prototype, {

  getBook() {
    return _book
  },

  getErrors() {
    return _errors
  },

  hasBook() {
    return _book && !isEmpty(_book)
  },

  isPersisted() {
    return _persisted
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

BooksUpdateStore.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.FETCH_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      if (action.filter)
        _book = BooksStore.find(action.filter)
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE_SELECT:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      _persisted = false
      _book = BooksStore.find(action.filter)
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE:
      _persisted = false
      setErrors()
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE_SUCCESS:
      _book = action.model
      setErrors()
      _persisted = true
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE_ERROR:
      _persisted = false
      setErrors(action.errors)
      BooksUpdateStore.emitChange()
      break

  }
})

module.exports = BooksUpdateStore