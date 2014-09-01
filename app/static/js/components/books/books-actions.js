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
  // TODO: could move this out, called directly from view
  // see https://facebook.github.io/flux/docs/chat.html#content
  BooksApi.create(model)
}

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

exports.update = function (model) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.UPDATE,
    model: model
  })
  BooksApi.update(model)
}

exports.updateSuccess = function (model) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.UPDATE_SUCCESS,
    model: model
  })
}

exports.updateError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.UPDATE_ERROR,
    errors: errors
  })
}

exports.destroy = function (model) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.DESTROY,
    model: model
  })
  BooksApi.destroy(model)
}

exports.destroySuccess = function (model) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.DESTROY_SUCCESS,
    model: model
  })
}

exports.destroyError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.DESTROY_ERROR,
    errors: errors
  })
}

exports.fetch = function (filter) {
  // TODO: pull from books-store if filter matches there already as in the case of edit
  AppDispatcher.handleViewAction({
    type: ActionTypes.FETCH,
    filter: filter
  })
  BooksApi.fetch(filter)
}

exports.fetchSuccess = function (models, filter) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_SUCCESS,
    models: models,
    filter: filter
  })
}

exports.fetchError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_ERROR,
    errors: errors
  })
}

exports.show = function (filter) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.SHOW,
    filter: filter
  })
  this.fetch(filter)
}
