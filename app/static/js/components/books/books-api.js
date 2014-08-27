'use strict'

var request = require('superagent')

var api = require('../../common/api')
var BooksActions = require('./books-actions')

exports.fetch = function (filter) {
  // TODO: handle filter
  request
    .get(api.getHostBaseUrl() + '/books')
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      // TODO: handle error evt


      BooksActions.fetched(res.body.books)
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