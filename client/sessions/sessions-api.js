'use strict'

var axios = require('axios')

var api = require('../common/api')
var SessionsActions = require('./sessions-actions')

exports.fetchCurrent = async (done) => {
  var url = api.getHostBaseUrl() + '/sessions/current'
  try {
    var res = await axios.get(url, {
      withCredentials: true
    })

    if (res.data.errors)
      return SessionsActions.fetchCurrentError(res.data.errors)

    SessionsActions.fetchCurrentSuccess(res.data.sessions)
  } catch (err) {
    SessionsActions.fetchCurrentError(err)
  }
}
