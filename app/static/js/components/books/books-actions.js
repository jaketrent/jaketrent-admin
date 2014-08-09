'use strict'

var BooksConstants = require('./books-constants')
var AppDispatcher = require('../../common/app-dispatcher')

module.exports = {
  create: function (model) {
    AppDispatcher.handleViewAction({
      actionType: BooksConstants.CREATE,
      model: model
    })
  },
  read: function (id) {
    AppDispatcher.handleViewAction({
      actionType: BooksConstants.READ,
      id: id
    })
  },
  update: function (id, model) {
    AppDispatcher.handleViewAction({
      actionType: BooksConstants.UPDATE,
      id: id,
      model: model
    })
  },
  destroy: function (id) {
    AppDispatcher.handleViewAction({
      actionType: BooksConstants.DESTROY,
      id: id
    })
  }
}
