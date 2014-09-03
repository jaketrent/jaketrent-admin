/** @jsx React.DOM */

var React = require('react')

var NotFound404 = require('./404-not-found')

var statuses = {
  404: NotFound404
}

var messages = {
  'not-found': NotFound404
}

module.exports = React.createClass({

  displayName: 'ErrorsIndex',

  render: function () {
    var errorByStatus = statuses[this.props.params.type]
    var errorByMessage = messages[this.props.params.type]
    // TODO: default

    return (errorByStatus || errorByMessage)()
  }

})