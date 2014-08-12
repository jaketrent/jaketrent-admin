/** @jsx React.DOM */

var find = require('lodash-node/modern/collections/find')
var React = require('react')

module.exports = React.createClass({

  propTypes: {
    errors: React.PropTypes.array.isRequired,
    param: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      errors: []
    }
  },

  errorFor: function (param) {
    return find(this.props.errors, function (err) {
      return err && err.param === param
    })
  },

  errorMsgFor: function (param) {
    return (this.errorFor(param) || {}).msg
  },

  render: function () {
    var msg = this.errorMsgFor(this.props.param)
    if (msg)
      return (
        <div className="message message-inline message-error">
          {msg}
        </div>
      )
    else
      return <div></div>
  }

})