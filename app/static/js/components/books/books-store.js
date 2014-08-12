'use strict'

var api = require('../../common/api')
var EventEmitter = require('events').EventEmitter
var JsonLinker = require('json-linker')
var merge = require('react/lib/merge')
var Promise = require('es6-promise').Promise
var request = require('superagent')
var toArray = require('lodash-node/modern/collections/toArray')

var AppDispatcher = require('../../common/app-dispatcher')
var AppEvents = require('../../common/app-events')
var BooksConstants = require('./books-constants')
var BooksEvents = require('./books-events')

var _books = {}

function update(book) {
  _books[book.id] = book
}
var cache = update

function destroy(id) {
  delete _books[id]
}

var BooksStore = merge(EventEmitter.prototype, {


  create: function (book) {
    return new Promise(function (resolve, reject) {
      request
        .post(api.getHostBaseUrl() + '/books')
        .set('Content-Type', 'application/json')
        .send(new JsonLinker(book, 'books').toJson())
        .end(function (err, res) {
          if (err) return reject(err)

          if (res.status !== 201)
            return reject(res.body)

          var book
          if (res.body && res.body.books) {
            book = res.body.books[0]
            cache(book)
          }
          resolve(book)
        })
    })
  },

  fetch: function () {
    return new Promise(function (resolve, reject) {
      request
        .get(api.getHostBaseUrl() + '/books')
        .end(function (err, res) {
          if (err) return reject(err)

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

  emitChange: function (eventName) {
    var args = arguments
    if (!eventName) {
      eventName = BooksEvents.CHANGE
    } else {
      args = Array.prototype.slice.call(arguments, 1)
    }

    this.emit.apply(this, [ eventName ].concat(args))
  },

  // TODO: rename event listener
  addChangeListener: function (eventNameOrCallback, callback) {
    console.log('ADD listne: ' + eventNameOrCallback)
    if (!eventNameOrCallback)
      throw new Error('Must provide callback')

    var eventName
    if (!callback) {
      callback = eventNameOrCallback
      eventName = BooksEvents.CHANGE
    } else {
      eventName = eventNameOrCallback
    }

    this.on(eventName, callback)
  },

  removeChangeListener: function (eventNameOrCallback, callback) {
    if (!eventNameOrCallback)
      throw new Error('Must provide callback')

    var eventName
    if (!callback) {
      callback = eventNameOrCallback
      eventName = BooksEvents.CHANGE
    }

    this.removeListener(eventName, callback)
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action

    switch(action.actionType) {
      case BooksConstants.CREATE:
        BooksStore.create(action.model)
          .then(function (book) {
            BooksStore.emitChange(BooksEvents.CREATED, book)
          }, function (errOrBodyWithErrors) {
            BooksStore.emitChange(AppEvents.ERROR, errOrBodyWithErrors)
          })
        break

      case BooksConstants.READ:
        BooksStore.fetch(action.filter)
          .then(function (books) {
            BooksStore.emitChange()
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