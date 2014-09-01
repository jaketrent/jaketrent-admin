'use strict'

var EventEmitter = require('events').EventEmitter
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')

var ActionTypes = BooksConstants.ActionTypes

var _book = {}

function cache(book) {
  if (Array.isArray(book))
    book = book[0]
  _book = book
}

function uncache() {
  _book = {}
}

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

var _done = false

var BooksUpdateStore = merge(EventEmitter.prototype, {

  getState: function () {
    return {
      errors: _errors,
      book: _book
    }
  },

  isDone: function () {
    return _done
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

BooksUpdateStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.FETCH_SUCCESS:
      AppDispatcher.waitFor([ BooksStore.dispatchToken ])
      if (action.filter)
        cache(BooksStore.find(action.filter))
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE:
      _done = false
      cache(action.model)
      setErrors()
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE_SUCCESS:
      cache(action.model)
      setErrors()
      _done = true
      BooksUpdateStore.emitChange()
      break

    case ActionTypes.UPDATE_ERROR:
      setErrors(action.errors)
      BooksUpdateStore.emitChange()
      break

  }
})

module.exports = BooksUpdateStore