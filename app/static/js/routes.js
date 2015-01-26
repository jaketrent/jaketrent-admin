var React = require('react')
var Route = require('react-router').Route

var routes = (
  <Route name="index" path="/" handler={require('./components/index')}>
    <Route name="books" path="/books" handler={require('./components/books/index')}>
      <Route name="books-create" path="/books/create" handler={require('./components/books/books-create')} />
      <Route name="books-show" path="/books/:id" handler={require('./components/books/books-show')} />
      <Route name="books-update" path="/books/:id/edit" handler={require('./components/books/books-update')} />
    </Route>
    <Route name="login" path="/login" handler={require('./components/login')} />
    <Route name="errors" path="/errors/:type" handler={require('./components/errors/index')} />
  </Route>
)

module.exports = routes