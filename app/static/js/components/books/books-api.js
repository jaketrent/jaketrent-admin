'use strict'

var parseLinkHeader = require('parse-link-header')
var request = require('superagent')

var api = require('../../common/api')
var BooksActions = require('./books-actions')

exports.fetch = function (filter) {
  var url = api.getHostBaseUrl() + '/books'
  if (filter && filter.id)
    url += '/' + filter.id

  request
    .get(url)
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      if (err || res.body.errors) return BooksActions.fetchError(err || res.body.errors)

//      parseLinkHeader(res.headers.link)

      BooksActions.fetchSuccess(res.body.books, filter)
    })
}

exports.create = function (model) {
  request
    .post(api.getHostBaseUrl() + '/books')
    .set('Content-Type', 'application/json')
    .send({ books: model })
    .end(function (err, res) {
      if (err || res.body.errors) return BooksActions.createError(err || res.body.errors)

      BooksActions.createSuccess(res.body.books)
    })
}

exports.update = function (model) {
  request
    .put(api.getHostBaseUrl() + '/books/' + model.id)
    .set('Content-Type', 'application/json')
    .send({ books: model })
    .end(function (err, res) {

      if (err || res.body.errors) return BooksActions.updateError(err || res.body.errors)

      BooksActions.updateSuccess(res.body.books)
    })
}

exports.destroy = function (model) {
  request
    .del(api.getHostBaseUrl() + '/books/' + model.id)
    .set('Content-Type', 'application/json')
    .end(function (err, res) {

      if (res.status != 204) return BooksActions.destroyError(new Error('Failed to destroy book'))

      BooksActions.destroySuccess(model)
    })
}