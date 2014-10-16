'use strict'

var EventEmitter = require('events').EventEmitter
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')

var ActionTypes = BooksConstants.ActionTypes

var _book = {}
var _errors = []
var _isCreated = false

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

var BooksCreateStore = merge(EventEmitter.prototype, {

  getBook: function () {
    return _book
  },

  getErrors: function () {
    return _errors
  },

  isCreated: function () {
    return _isCreated
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

BooksCreateStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.CREATE:
      _isCreated = false
      break

    case ActionTypes.CREATE_SUCCESS:
      _book = action.model
      _isCreated = true
      setErrors()
      BooksCreateStore.emitChange()
      break

    case ActionTypes.CREATE_ERROR:
      setErrors(action.errors)
      BooksCreateStore.emitChange()
      break

  }
})

module.exports = BooksCreateStore