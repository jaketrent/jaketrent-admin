'use strict'

var EventEmitter = require('events').EventEmitter
var isEmpty = require('lodash-node/modern/objects/isEmpty')
var merge = require('react/lib/merge')

var AppConstants = require('../common/app-constants')
var AppDispatcher = require('../common/app-dispatcher')
var SessionsApi = require('./sessions-api')
var SessionsConstants = require('./sessions-constants')

var ActionTypes = SessionsConstants.ActionTypes

var _session = {}
var _isQueried = false

var CurrentSessionStore = merge(EventEmitter.prototype, {

  getSession() {
    return _session
  },

  hasSession() {
    return _session && !isEmpty(_session)
  },

  isQueried() {
    return _isQueried
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

CurrentSessionStore.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.FETCH_CURRENT:
      SessionsApi.fetchCurrent()
      break

    case ActionTypes.FETCH_CURRENT_SUCCESS:
      _isQueried = true
      _session = action.model
      CurrentSessionStore.emitChange()
      break

    case ActionTypes.FETCH_CURRENT_ERROR:
      _isQueried = true
      break
  }
})

module.exports = CurrentSessionStore
