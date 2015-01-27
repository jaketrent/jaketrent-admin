'use strict'

var keyMirror = require('react/lib/keyMirror')

module.exports = {

  ActionTypes: keyMirror({
    CREATE_SELECT: null,
    CREATE: null,
    CREATE_SUCCESS: null,
    CREATE_ERROR: null,

    FETCH: null,
    FETCH_SUCCESS: null,
    FETCH_ERROR: null,

    UPDATE_SELECT: null,
    UPDATE: null,
    UPDATE_SUCCESS: null,
    UPDATE_ERROR: null,

    DESTROY: null,
    DESTROY_SUCCESS: null,
    DESTROY_ERROR: null,

    SHOW: null
  })

}
