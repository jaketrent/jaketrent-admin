var React = require('react')
var RouteHandler = require('react-router').RouteHandler

var AuthenticatedRoute = require('../common/authenticated-route')
var BooksActions = require('./books-actions')
var BooksList = require('./books-list')

module.exports = React.createClass({

  displayName: 'BooksIndex',

  mixins: [ AuthenticatedRoute ],

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
          <RouteHandler />
        </main>
      </div>
    )
  }
})