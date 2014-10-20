/** @jsx React.DOM */

var CurrentSessionStore = require('../components/sessions/current-session-store')

function isAuthenticated() {
  return CurrentSessionStore.hasSession()
}

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (!isAuthenticated()) {
        return transition.redirect('/errors/not-authenticated')
      }
    }
  }
}

module.exports = AuthenticatedRoute
 