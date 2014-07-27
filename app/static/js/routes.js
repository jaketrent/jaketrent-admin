/** @jsx React.DOM */

var React = require('react')
var Route = require('react-router').Route

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
  <Route handler={App}>
    <Route name="index" path="/" handler={require('./components/index')} />
  </Route>
)

module.exports = routes