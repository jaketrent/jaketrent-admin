'use strict'

var isEmpty = require('lodash-node/modern/objects/isEmpty')

var BooksApi = require('./books-api')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')
var AppDispatcher = require('../../common/app-dispatcher')

var ActionTypes = BooksConstants.ActionTypes

function ensureFindable(filter) {
  var foundBook = BooksStore.find(filter)
  if (!foundBook)
    BooksApi.fetch(null, filter)
}

exports.createSelect = function () {
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE_SELECT
  })
}

exports.create = function (model) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE,
    model: model
  })
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

exports.updateSelect = function (filter) {
  ensureFindable(filter)
  AppDispatcher.handleViewAction({
    type: ActionTypes.UPDATE_SELECT,
    filter: filter
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
  AppDispatcher.handleViewAction({
    type: ActionTypes.FETCH,
    filter: filter
  })
}

exports.fetchSuccess = function (models, filter, page, linkHeader) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_SUCCESS,
    models: models,
    filter: filter,
    page: page,
    linkHeader: linkHeader
  })
}

exports.fetchError = function (errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_ERROR,
    errors: errors
  })
}

exports.show = function (filter) {
  ensureFindable(filter)
  AppDispatcher.handleViewAction({
    type: ActionTypes.SHOW,
    filter: filter
  })
}
