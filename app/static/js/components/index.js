/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({

  render: function () {
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
  }

})