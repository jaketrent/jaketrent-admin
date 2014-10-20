'use strict'

var isEmpty = require('lodash-node/modern/objects/isEmpty')

var SessionsConstants = require('./sessions-constants')
var AppDispatcher = require('../../common/app-dispatcher')

var ActionTypes = SessionsConstants.ActionTypes

exports.fetchCurrent = function () {
  AppDispatcher.handleViewAction({
    type: ActionTypes.FETCH_CURRENT
  })
}

exports.fetchCurrentSuccess = function (model) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_CURRENT_SUCCESS,
    model: model
  })
}

exports.fetchCurrentError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_CURRENT_ERROR,
    errors: errors
  })
}
