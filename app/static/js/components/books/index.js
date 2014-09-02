/** @jsx React.DOM */

var React = require('react')

var BooksActions = require('./books-actions')
var BooksList = require('./books-list')

module.exports = React.createClass({

  displayName: 'BooksIndex',

  componentDidMount: function () {
    BooksActions.fetch()
  },

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