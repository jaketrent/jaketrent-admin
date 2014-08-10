'use strict'

var EventEmitter = require('events').EventEmitter
var merge = require('react/lib/merge')
var toArray = require('lodash-node/modern/collections/toArray')

var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var genId = require('../../common/id').gen

var CHANGE_EVENT = 'change'

var _books = {}

// TODO: rm when fixture not wanted
_books['d2a20b977ab5406282dcf966408176d2'] = {
  id: 'd2a20b977ab5406282dcf966408176d2',
  title: 'Test Book',
  description: 'Something here and there',
  cover: 'http://i.imgur.com/8MmPYD0.jpg',
  reviewLink: 'http://google.com'
}

// TODO: connect to api
function create(book) {
  var id = genId()
  book.id = id
  _books[id] = book
}

function update(book) {
  _books[id] = book
}

function destroy(id) {
  delete _books[id]
}

var BookStore = merge(EventEmitter.prototype, {

  find: function (filter) {
    if (filter) {
      var books = toArray(_books).filter(function (book) {
        return Object.keys(filter).every(function (key) {
          return book[key] && book[key] === filter[key]
        })
      })
      if (books && filter && filter.id)
        return books[0]
      else
        return books
    } else {
      return toArray(_books)
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action

    switch(action.actionType) {
      case BooksConstants.CREATE:
        create(action.model)
        BookStore.emitChange()
        break

      case BooksConstants.UPDATE:
        update(action.id, action.model)
        BookStore.emitChange()
        break

      case BooksConstants.DESTROY:
        destroy(action.id)
        BookStore.emitChange()
        break

      // add more cases for other actionTypes, like UPDATE, etc.
    }

    return true // No errors. Needed by promise in Dispatcher.
  })

})

module.exports = BookStore