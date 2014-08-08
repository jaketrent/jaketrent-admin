/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({
  render: function () {
    return (
      <section className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link className="sidebar-link" to="book" id="1">Book 1</Link></li>
          <li className="sidebar-item"><Link className="sidebar-link" to="book" id="2">Book 2</Link></li>
        </ul>
      </section>
    )
  }
})