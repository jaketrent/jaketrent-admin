/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

var BooksList = require('./books-list')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="page">
        <header className="page-header">
          <h2 className="page-title">Books</h2>
          <Link to="books-create" className="page-create-link">
            <button className="page-create-link-icon">+</button>
            Create New
          </Link>
        </header>
        <BooksList />
        <main className="page-body">
          <this.props.activeRouteHandler />
        </main>
      </div>
    )
  }
})