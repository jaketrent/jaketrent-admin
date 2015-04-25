'use strict'

var SessionsApi = require('./sessions-api')
var SessionsConstants = require('./sessions-constants')
var AppDispatcher = require('../common/app-dispatcher')

var ActionTypes = SessionsConstants.ActionTypes

exports.fetchCurrent = () => {
  SessionsApi.fetchCurrent()
}

exports.fetchCurrentSuccess = (model) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_CURRENT_SUCCESS,
    model: model
  })
}

exports.fetchCurrentError = (errors) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_CURRENT_ERROR,
    errors: errors
  })
}
