/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var api = require('../../common/api')
var CurrentSessionStore = require('../sessions/current-session-store')
var ErrorsTextLayout = require('./layouts/text')
var SessionsActions = require('../sessions/sessions-actions')

module.exports = React.createClass({

  displayName: '401NotAuthenticated',

  componentDidMount: function () {
    CurrentSessionStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    Router.transitionTo('index')
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
        <button onClick={this.onClickSignIn}>Sign in with Twitter</button>
      </ErrorsTextLayout>
    )
  }

})