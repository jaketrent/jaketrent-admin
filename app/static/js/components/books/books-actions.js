'use strict'

var BooksApi = require('./books-api')
var BooksConstants = require('./books-constants')
var AppDispatcher = require('../../common/app-dispatcher')

var ActionTypes = BooksConstants.ActionTypes

exports.create = function (model) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE,
    model: model
  })
  BooksApi.create(model)
}

//exports.created = function (model, errors) {
//  AppDispatcher.handleServerAction({
//    type: ActionTypes.CREATED,
//    model: model,
//    errors: errors
//  })
//}

exports.createSuccess = function (model) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.CREATE_SUCCESS,
    model: model
  })
}

exports.createError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.CREATE_ERROR,
    errors: errors
  })
}



//exports.errored = function (errors) {
//  AppDispatcher.handleServerAction({
//    type: ActionTypes.ERRORED,
//    errors: errors
//  })
//}

exports.fetch = function (filter) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.FETCH,
    filter: filter
  })
  BooksApi.fetch(filter)
}

exports.fetched = function (models) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCHED,
    models: models
  })
}