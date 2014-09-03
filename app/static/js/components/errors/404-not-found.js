/** @jsx React.DOM */

var React = require('react')

var ErrorsTextLayout = require('./layouts/text')

module.exports = React.createClass({

  displayName: '404NotFound',

  render: function () {
    return (
      <ErrorsTextLayout>
        404 Not Found
      </ErrorsTextLayout>
    )
  }

})