var React = require('react')
var Router = require('react-router')
var Navigation = Router.Navigation

var api = require('../common/api')
var CurrentSessionStore = require('../sessions/current-session-store')
var ErrorsTextLayout = require('./layouts/text')
var SessionsActions = require('../sessions/sessions-actions')

module.exports = React.createClass({

  displayName: '401NotAuthenticated',

  mixins: [ Navigation ],

  componentDidMount: function () {
    CurrentSessionStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.transitionTo('index')
  },

  onClickSignIn: function () {
    // TODO: move this into action?
    var win = this.openWindow(api.getHostBaseUrl() + '/login', 'Login', 800, 600)
    this.interval = window.setInterval(function () {
      if (win.closed) {
        window.clearInterval(this.interval)
        SessionsActions.fetchCurrent()
      }
    }.bind(this), 1000)
  },

  openWindow: function (url, title, width, height) {
    var left = (screen.width / 2) - (width / 2)
    var top = (screen.height / 2) - (height / 2)
    return window.open(url, title, 'location=0,status=0,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left)
  },

  render: function () {
    return (
      <ErrorsTextLayout>
        <div>401 Not Authenticated</div>
        <button className="btn btn-secondary sign-in-btn" onClick={this.onClickSignIn}>Sign in with Twitter</button>
      </ErrorsTextLayout>
    )
  }

})