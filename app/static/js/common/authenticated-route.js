/** @jsx React.DOM */

var CurrentSessionStore = require('../components/sessions/current-session-store')

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (!CurrentSessionStore.isQueried())
        return transition.redirect('/login', null, { redirectTo: transition.path })

      if (!CurrentSessionStore.hasSession())
        return transition.redirect('/errors/not-authenticated')
    }
  }
}

module.exports = AuthenticatedRoute
