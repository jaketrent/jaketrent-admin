var React = require('react')
var RouteHandler = Router.RouteHandler

var SessionsActions = require('./sessions-actions')
var CurrentSessionStore = require('./current-session-store')

module.exports = React.createClass({

  getInitialState() {
    return this.getStateFromStores()
  },

  getStateFromStores() {
    return {
      isSessionQueried: CurrentSessionStore.isQueried()
    }
  },

  componentDidMount() {
    CurrentSessionStore.addChangeListener(this._onChange)
    SessionsActions.fetchCurrent()
  },

  componentWillUnmount() {
    CurrentSessionStore.removeChangeListener(this._onChange)
  },

  _onChange() {
    this.setState(this.getStateFromStores())
  },

  render() {
    if (this.state.isSessionQueried)
      return (
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">jaketrent-admin</h1>
            <nav className="app-nav">
              <Link className="app-nav-link" href="/books">Books</Link>
            </nav>
          </header>
          <div className="app-container">
            RouteHandler
          </div>
        </div>
      )
    else
      return <div>Loading...</div>
  }

})
