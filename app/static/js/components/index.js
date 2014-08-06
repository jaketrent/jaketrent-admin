/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <header>
          <h1>jaketrent-admin</h1>
          <nav>
            <Link to="books">Books</Link>
          </nav>
        </header>
        <div>
          <this.props.activeRouteHandler />
        </div>
      </div>
    )
  }

})