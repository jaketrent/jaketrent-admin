'use strict'

var keyMirror = require('react/lib/keyMirror')

module.exports = {

  ActionTypes: keyMirror({
    FETCH_CURRENT: null,
    FETCH_CURRENT_SUCCESS: null,
    FETCH_CURRENT_ERROR: null
  })

}