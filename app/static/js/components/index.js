/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

var SessionsActions = require('./sessions/sessions-actions')
var CurrentSessionStore = require('./sessions/current-session-store')

module.exports = React.createClass({

  getInitialState: function () {
    return this.getStateFromStores()
  },

  getStateFromStores: function () {
    return {
      isSessionQueried: CurrentSessionStore.isQueried()
    }
  },

  componentDidMount: function () {
    CurrentSessionStore.addChangeListener(this._onChange)
    SessionsActions.fetchCurrent()
  },

  componentWillUnmount: function () {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(this.getStateFromStores())
  },

  render: function () {
    if (this.state.isSessionQueried)
      return (
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">jaketrent-admin</h1>
            <nav className="app-nav">
              <Link className="app-nav-link" to="books">Books</Link>
            </nav>
          </header>
          <div className="app-container">
            <this.props.activeRouteHandler />
          </div>
        </div>
      )
    else
      return null
  }

})
