'use strict'

var request = require('superagent')

var api = require('../../common/api')
var SessionsActions = require('./sessions-actions')

exports.fetchCurrent = function (done) {
  request
    .get(api.getHostBaseUrl() + '/sessions/current')
    .set('Content-Type', 'application/json')
    .withCredentials()
    .end(function (err, res) {
      if (err || res.body.errors) return SessionsActions.fetchCurrentError(err || res.body.sessions)

      SessionsActions.fetchCurrentSuccess(res.body.sessions)
    })
}
