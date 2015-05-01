'use strict'

var isEmpty = require('lodash-node/modern/lang/isEmpty')

var BooksApi = require('./books-api')
var BooksConstants = require('./books-constants')
var BooksStore = require('./books-store')
var AppDispatcher = require('../common/app-dispatcher')

var ActionTypes = BooksConstants.ActionTypes

function ensureFindable(filter) {
  var foundBook = BooksStore.find(filter)
  if (!foundBook)
    BooksApi.fetch(null, filter)
}

exports.createSelect = () => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE_SELECT
  })
}

exports.create = (model) => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE,
    model: model
  })
  BooksApi.create(model)
}

exports.createSuccess = (model) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.CREATE_SUCCESS,
    model: model
  })
}

exports.createError = (errors) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.CREATE_ERROR,
    errors: errors
  })
}

exports.updateSelect = (filter) => {
  ensureFindable(filter)
  AppDispatcher.handleViewAction({
    type: ActionTypes.UPDATE_SELECT,
    filter: filter
  })
}

exports.update = (model) => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.UPDATE,
    model: model
  })
  BooksApi.update(model)
}

exports.updateSuccess = (model) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.UPDATE_SUCCESS,
    model: model
  })
}

exports.updateError = (errors) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.UPDATE_ERROR,
    errors: errors
  })
}

exports.destroy = (model) => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.DESTROY,
    model: model
  })
  BooksApi.destroy(model)
}

exports.destroySuccess = (model) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.DESTROY_SUCCESS,
    model: model
  })
}

exports.destroyError = (errors) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.DESTROY_ERROR,
    errors: errors
  })
}

exports.fetch = (filter) => {
  BooksApi.fetch(BooksStore.getUrl(), filter, BooksStore.getPage())
}

exports.fetchSuccess = (models, filter, page, linkHeader) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_SUCCESS,
    models: models,
    filter: filter,
    page: page,
    linkHeader: linkHeader
  })
}

exports.fetchError = (errors) => {
  AppDispatcher.handleServerAction({
    type: ActionTypes.FETCH_ERROR,
    errors: errors
  })
}

exports.show = (filter) => {
  ensureFindable(filter)
  AppDispatcher.handleViewAction({
    type: ActionTypes.SHOW,
    filter: filter
  })
}
