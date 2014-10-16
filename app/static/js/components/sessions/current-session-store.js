'use strict'

var EventEmitter = require('events').EventEmitter
var isEmpty = require('lodash-node/modern/objects/isEmpty')
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var SessionsApi = require('./sessions-api')
var SessionsConstants = require('./sessions-constants')

var ActionTypes = SessionsConstants.ActionTypes

var _session = {}

var CurrentSessionStore = merge(EventEmitter.prototype, {

  getSession: function () {
    return _session
  },

  hasSession: function () {
    console.log('_session', _session && !isEmpty(_session), _session)
    return _session && !isEmpty(_session)
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

CurrentSessionStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.FETCH_CURRENT:
      SessionsApi.fetchCurrent()
      break

    case ActionTypes.FETCH_CURRENT_SUCCESS:
      _session = action.model
      CurrentSessionStore.emitChange()
      break

  }
})

module.exports = CurrentSessionStore