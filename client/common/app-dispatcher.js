'use strict'

var AppConstants = require('./app-constants')
var Dispatcher = require('flux').Dispatcher
var copyProperties = require('react/lib/copyProperties')

var PayloadSources = AppConstants.PayloadSources

module.exports = copyProperties(new Dispatcher(), {

  handleServerAction(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    }
    this.dispatch(payload)
  },

  handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    }
    this.dispatch(payload)
  }

})
