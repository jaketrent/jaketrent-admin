'use strict'

var keyMirror = require('react/lib/keyMirror')

module.exports = {

  ActionTypes: keyMirror({
    CREATE: null,
    CREATE_SUCCESS: null,
    CREATE_ERROR: null,
    FETCH: null,
    FETCHED: null,
    UPDATE_SELECT: null,
    UPDATE: null,
    UPDATE_SUCCESS: null,
    UPDATE_ERROR: null
  })

}