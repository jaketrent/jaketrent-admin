var filter = require('lodash-node/modern/collection/filter')
var React = require('react')

module.exports = React.createClass({

  propTypes: {
    errors: React.PropTypes.array.isRequired,
    id: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      errors: []
    }
  },

  errorsFor: function (id) {
    return filter(this.props.errors, function (err) {
      return err && err.id === id
    })
  },

  renderErrorMsg: function (error) {
    return (
      <div className="message message-inline message-error">
          {error.title}
      </div>
    )
  },

  render: function () {
    return <span>{(this.errorsFor(this.props.id) || []).map(this.renderErrorMsg)}</span>
  }

})
