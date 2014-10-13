'use strict'

var parseLinkHeader = require('parse-link-header')
var request = require('superagent')

var api = require('../../common/api')
var BooksActions = require('./books-actions')

function requestBooks(url, filter, page, done) {
  if (!url)
    url = api.getHostBaseUrl() + '/books'

  if (filter && filter.id)
    url += '/' + filter.id

  url += '?page=' + (page || 1)

  request
    .get(url)
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      if (err || res.body.errors) return done(err || res.body.errors)

      done(null, res)
    })
}

function hasNextPage(linkHeaderObj) {
  return linkHeaderObj
      && linkHeaderObj.next
      && linkHeaderObj.last
      && (linkHeaderObj.next.page !== linkHeaderObj.last.page)
}

exports.fetch = function (filter, page) {
  function requestBooksCallback(err, res) {
    if (err) return BooksActions.fetchError(err || res.body.errors)

    if (res.headers && res.headers.link) {
      var linkHeaderObj = parseLinkHeader(res.headers.link)

      if (hasNextPage(linkHeaderObj))
        requestBooks(linkHeaderObj.next.url, filter, linkHeaderObj.next.page, requestBooksCallback)
    }

    BooksActions.fetchSuccess(res.body.books, filter, page)
  }

  requestBooks(null, filter, page, requestBooksCallback)
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