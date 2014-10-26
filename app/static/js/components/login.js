/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var CurrentSessionStore = require('./sessions/current-session-store')

module.exports = React.createClass({

  displayName: 'Login',

  componentDidMount: function () {
    CurrentSessionStore.addChangeListener(this._onChange)
    this.reenterNormalRouting()
  },

  componentWillMount: function () {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.reenterNormalRouting()
  },

  reenterNormalRouting: function () {
    if (CurrentSessionStore.isQueried())
      Router.transitionTo(this.props.query.redirectTo)
  },

  render: function () {
    return (
      <p>Logging in...</p>
    )
  }

})