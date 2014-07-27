/** @jsx React.DOM */

var React = require('react')
var Route = require('react-router').Route
var Routes = require('react-router').Routes

var App = React.createClass({
  render: function () {
    return (
      <div>
        <this.props.activeRouteHandler />
      </div>
      )
  }
})

var routes = (
  <Routes>
    <Route handler={App}>
      <Route name="index" path="/" handler={require('./components/index')} />
    </Route>
  </Routes>
)

module.exports = routes