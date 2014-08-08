/** @jsx React.DOM */

var React = require('react')
var BooksList = require('./books-list')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="page">
        <header className="page-header">
          <h2 className="page-title">Books</h2>
        </header>
        <BooksList />
        <main className="page-body">
          <this.props.activeRouteHandler />
        </main>
      </div>
    )
  }
})