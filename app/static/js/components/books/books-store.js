'use strict'

var EventEmitter = require('events').EventEmitter
var find = require('lodash-node/modern/collections/find')
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksApi = require('./books-api')
var BooksConstants = require('./books-constants')

var ActionTypes = BooksConstants.ActionTypes

var _books = []
var _latestLinkHeader

function cache(books, page) {
  if (!books) return

  if (!Array.isArray(books))
    books = [ books ]

  if (!page)
    page = 1

  _books = _books.concat(books.map(function (book) {
    return {
      book: book,
      page: page
    }
  }))
}

// TODO: use just pages or just urls
function getUrl() {
  if (BooksStore.hasNextPage())
    return _latestLinkHeader.next.url
}

function getPage() {
  if (BooksStore.hasNextPage())
    return _latestLinkHeader.next.page
  else if (!_latestLinkHeader)
    return 1
}

function getLastPage() {
  if (_latestLinkHeader && _latestLinkHeader.last)
    return _latestLinkHeader.last.page
}

var BooksStore = merge(EventEmitter.prototype, {

  find: function (filter) {
    var records = _books

    if (filter) {

      if (filter.id) {
        var foundRecord = find(records, function (record) {
          // props.params is a string, api is a number
          return record.book.id == filter.id
        })

        if (foundRecord)
          return foundRecord.book
        else
          return
      }

      return records
        .filter(function (record) {
          return Object.keys(filter).every(function (key) {
            return record.book[key] && record.book[key] == filter[key]
          })
        })
        .map(function (record) {
          return record.book
        })
    } else {
      return records.map(function (record) {
        return record.book
      })
    }
  },

  hasNextPage: function () {
    return _latestLinkHeader
      && _latestLinkHeader.next
      && _latestLinkHeader.last
      && (_latestLinkHeader.next.page !== _latestLinkHeader.last.page)
  },

  emitChange: function () {
    this.emit(AppConstants.Events.CHANGE, arguments)
  },

  addChangeListener: function (callback) {
    this.on(AppConstants.Events.CHANGE, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(AppConstants.Events.CHANGE, callback)
  }
})

BooksStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action

  switch(action.type) {

    case ActionTypes.FETCH:
      BooksApi.fetch(getUrl(), action.filter, getPage())
      break

    case ActionTypes.FETCH_SUCCESS:
      _latestLinkHeader = action.linkHeader
      cache(action.models, action.page)
      BooksStore.emitChange()
      break

    case ActionTypes.CREATE_SUCCESS:
      cache(action.models, getLastPage())
      BooksStore.emitChange()
      break

    case ActionTypes.UPDATE_SUCCESS:
//      cache.setItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

    case ActionTypes.DESTROY_SUCCESS:
//      cache.removeItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

  }
})

module.exports = BooksStore