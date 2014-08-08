/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <header className="books-header">
        <h2 className="books-title">Book {this.props.params.id}</h2>
      </header>
    )
  }
})