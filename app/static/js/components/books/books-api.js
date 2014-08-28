'use strict'

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
      // TODO: handle error evt

      BooksActions.fetched(res.body.books, filter)
    })
}

exports.create = function (model) {
  // TODO: handle json serialization in standard way
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
  // TODO: handle json serialization in standard way
  request
    .put(api.getHostBaseUrl() + '/books/' + model.id)
    .set('Content-Type', 'application/json')
    .send({ books: model })
    .end(function (err, res) {

      if (err || res.body.errors) return BooksActions.updateError(err || res.body.errors)

      BooksActions.updateSuccess(res.body.books)
    })
}