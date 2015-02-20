'use strict'

var EventEmitter = require('events').EventEmitter
var merge = require('react/lib/merge')

var AppConstants = require('../common/app-constants')
var AppDispatcher = require('../common/app-dispatcher')
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

  getBook() {
    return _book
  },

  getErrors() {
    return _errors
  },

  isCreated() {
    return _isCreated
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

BooksCreateStore.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.CREATE_SELECT:
      _isCreated = false
      _book = {}
      BooksCreateStore.emitChange()
      break

    case ActionTypes.CREATE:
      _isCreated = false
      BooksCreateStore.emitChange()
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
