var React = require('react')

var CurrentSessionStore = require('././current-session-store')

module.exports = React.createClass({

  displayName: 'Login',

  componentDidMount() {
    CurrentSessionStore.addChangeListener(this._onChange)
    this.reenterNormalRouting()
  },

  componentWillMount() {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange() {
    this.reenterNormalRouting()
  },

  reenterNormalRouting() {
    if (CurrentSessionStore.isQueried())
      this.transitionTo(this.getQuery().redirectTo)
  },

  render() {
    return (
      <p>Logging in...</p>
    )
  }

})