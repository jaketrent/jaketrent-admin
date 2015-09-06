'use strict'

var axios = require('axios')
var parseLinkHeader = require('parse-link-header')

var api = require('../common/api')
var BooksActions = require('./books-actions')

exports.fetch = async (url, filter, page) => {
  if (!url)
    url = api.getHostBaseUrl() + '/books'

  if (filter && filter.id)
    url += '/' + filter.id

  try {
    var res = await axios.get(url, {
      withCredentials: true
    })

    if (res.data.errors)
      return BooksActions.fetchError(res.data.errors)

    var linkHeader

    if (res.headers && res.headers.link)
      linkHeader = parseLinkHeader(res.headers.link)

    BooksActions.fetchSuccess(res.data.books, filter, page, linkHeader)
  } catch (err) {
    BooksActions.fetchError(err)
  }
}

exports.create = async (model) => {
  var url = api.getHostBaseUrl() + '/books'
  try {
    var res = await axios.post(url, { books: model }, {
      withCredentials: true
    })

    if (res.data.errors)
      return BooksActions.createError(res.data.errors)

    BooksActions.createSuccess(res.data.books)
  } catch (err) {
    BooksActions.createError(err)
  }
}

exports.update = async (model) => {
  var url = api.getHostBaseUrl() + '/books/' + model.id
  try {
    var res = await axios.put(url, { books: model }, {
      withCredentials: true
    })

    if (res.data.errors)
      return BooksActions.updateError(res.data.errors)

    BooksActions.updateSuccess(res.data.books)
  } catch (err) {
    BooksActions.updateError(err)
  }
}

exports.destroy = async (model) => {
  var url = api.getHostBaseUrl() + '/books/' + model.id
  try {
    var res = await axios.delete(url, {
      withCredentials: true
    })

    if (res.data.errors)
      return BooksActions.destroyError(res.data.errors)

    BooksActions.destroySuccess(model)
  } catch (err) {
    BooksActions.destroyError(err)
  }
}