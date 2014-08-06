/** @jsx React.DOM */

var React = require('react')
var Route = require('react-router').Route
var Routes = require('react-router').Routes

var routes = (
  <Routes>
    <Route name="index" path="/" handler={require('./components/index')}>
      <Route name="books" path="/books" handler={require('./components/books/index')} />
    </Route>
  </Routes>
)

module.exports = routes