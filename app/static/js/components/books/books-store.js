'use strict'

var EventEmitter = require('events').EventEmitter
var JsonLinker = require('json-linker')
var merge = require('react/lib/merge')
var Promise = require('es6-promise').Promise
var request = require('superagent')
var toArray = require('lodash-node/modern/collections/toArray')

var AppDispatcher = require('../../common/app-dispatcher')
var BooksConstants = require('./books-constants')
var genId = require('../../common/id').gen

var CHANGE_EVENT = 'change'

var _books = {}

// TODO: rm when fixture not wanted
//_books['d2a20b977ab5406282dcf966408176d2'] = {
//  id: 'd2a20b977ab5406282dcf966408176d2',
//  title: 'Test Book',
//  description: 'Something here and there',
//  coverUrl: 'http://i.imgur.com/8MmPYD0.jpg',
//  reviewUrl: 'http://google.com'
//}

// TODO: connect to api
function create(book) {
  var id = genId()
  book.id = id
  _books[id] = book
}

function update(book) {
  _books[book.id] = book
}
var cache = update

function destroy(id) {
  delete _books[id]
}

var BooksStore = merge(EventEmitter.prototype, {

  fetch: function () {
    console.log('fetch')
    return new Promise(function (resolve, reject) {
      console.log('prom')
      request
        .get('http://localhost:3000/api/v1/books')
        .end(function (err, res) {
          if (err) reject(err)

          var books = []
          if (res.body && res.body.books) {
            books = res.body.books
          }
          books.map(cache)
          resolve(books)
        })
    })
  },

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
    this.emit(CHANGE_EVENT, arguments)
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
        BooksStore.emitChange()
        break

      case BooksConstants.READ:
        BooksStore.fetch(action.filter)
          .then(function (books) {
            BooksStore.emitChange(books)
            return true
          }, function (err) {
            return false
          })
        break

      case BooksConstants.UPDATE:
        update(action.id, action.model)
        BooksStore.emitChange()
        break

      case BooksConstants.DESTROY:
        destroy(action.id)
        BooksStore.emitChange()
        break

      // add more cases for other actionTypes, like UPDATE, etc.
    }

    // TODO: re-enable for books#create
//    return true // No errors. Needed by promise in Dispatcher.
  })

})

module.exports = BooksStore