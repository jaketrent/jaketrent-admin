var React = require('react')
var Router = require('react-router')
var Navigation = Router.Navigation

var CurrentSessionStore = require('././current-session-store')

module.exports = React.createClass({

  displayName: 'Login',

  mixins: [ Navigation, Router.State ],

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
      this.transitionTo(this.getQuery().redirectTo)
  },

  render: function () {
    return (
      <p>Logging in...</p>
    )
  }

})