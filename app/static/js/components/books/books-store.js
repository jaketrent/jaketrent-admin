'use strict'

var EventEmitter = require('events').EventEmitter
var find = require('lodash-node/modern/collections/find')
var merge = require('react/lib/merge')

var AppConstants = require('../../common/app-constants')
var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var Cache = require('../../common/cache')

var ActionTypes = BooksConstants.ActionTypes

var cache = new Cache()

var BooksStore = merge(EventEmitter.prototype, {

  find: function (filter) {
    var allBooks = cache.getAllItems()

    if (filter) {

      if (filter.id) {
        return find(allBooks, function (book) {
          // props.params is a string, api is a number
          return book.id == filter.id
        })
      }

      return allBooks
        .filter(function (book) {
          return Object.keys(filter).every(function (key) {
            return book[key] && book[key] == filter[key]
          })
      })
    } else {
      return allBooks
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
      cache.setItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

    case ActionTypes.CREATE_SUCCESS:
      cache.setItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

    case ActionTypes.UPDATE_SUCCESS:
      cache.setItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

    case ActionTypes.DESTROY_SUCCESS:
      cache.removeItem(action.models, action.filter, action.page)
      BooksStore.emitChange()
      break

  }
})

module.exports = BooksStore