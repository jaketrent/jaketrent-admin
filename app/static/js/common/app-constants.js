'use strict'

var keyMirror = require('react/lib/keyMirror')

module.exports = {

  ActionTypes: keyMirror({
    TRANSITION: null
  }),

  Events: keyMirror({
    CHANGE: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

}