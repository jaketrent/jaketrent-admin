'use strict'

var EventEmitter = require('events').EventEmitter
var merge = require('react/lib/merge')
var toArray = require('lodash-node/modern/collections/toArray')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')

var ActionTypes = BooksConstants.ActionTypes

var _books = {}

function cache(books) {
  if (!Array.isArray(books))
    books = [ books ]

  books.forEach(function (book) {
    _books[book.id] = book
  })
}

function uncache(id) {
  delete _books[id]
}

var BooksStore = merge(EventEmitter.prototype, {

  getState: function (filter) {
    if (filter && filter.id) {
      return {
        book: BooksStore.find(filter) || {}
      }
    } else {
      return {
        books: BooksStore.find(filter) || []
      }
    }
  },

  find: function (filter) {
    if (filter) {

      if (filter.id) {
        return _books[filter.id]
      }

      return toArray(_books)
        .filter(function (book) {
          return Object.keys(filter).every(function (key) {
            return book[key] && book[key] == filter[key]
          })
      })
    } else {
      return toArray(_books)
    }
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

    case ActionTypes.FETCH_SUCCESS:
      cache(action.models)
      BooksStore.emitChange()
      break

    case ActionTypes.CREATE_SUCCESS:
      cache(action.model)
      BooksStore.emitChange()
      break

    case ActionTypes.UPDATE_SUCCESS:
      cache(action.model)
      BooksStore.emitChange()
      break

    case ActionTypes.DESTROY_SUCCESS:
      uncache(action.model)
      BooksStore.emitChange()
      break

  }
})

module.exports = BooksStore