/** @jsx React.DOM */

var React = require('react')
var Route = require('react-router').Route
var Routes = require('react-router').Routes

var routes = (
  <Routes>
    <Route name="index" path="/" handler={require('./components/index')}>
      <Route name="books" path="/books" handler={require('./components/books/index')}>
        <Route name="books-create" path="/books/create" handler={require('./components/books/books-create')} />
        <Route name="books-show" path="/books/:id" handler={require('./components/books/books-show')} />
        <Route name="books-update" path="/books/:id/edit" handler={require('./components/books/books-update')} />
      </Route>
      <Route name="errors" path="/errors/:type" handler={require('./components/errors/index')} />
    </Route>
  </Routes>
)

module.exports = routes