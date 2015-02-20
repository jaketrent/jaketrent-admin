'use strict'

var AppConstants = require('./app-constants')
var AppDispatcher = require('./app-dispatcher')

var ActionTypes = AppConstants.ActionTypes

exports.transition = (routeState) => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.TRANSITION,
    routeState: routeState
  })
}
