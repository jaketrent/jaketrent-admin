var React = require('react')
var Route = require('react-router').Route

var routes = (
  <Route name="index" path="/" handler={require('../sessions/index')}>
    <Route name="books" path="/books" handler={require('../books/index')}>
      <Route name="books-create" path="/books/create" handler={require('../books/books-create')} />
      <Route name="books-show" path="/books/:id" handler={require('../books/books-show')} />
      <Route name="books-update" path="/books/:id/edit" handler={require('../books/books-update')} />
    </Route>
    <Route name="login" path="/login" handler={require('../sessions/login')} />
    <Route name="errors" path="/errors/:type" handler={require('../errors/index')} />
  </Route>
)

module.exports = routes