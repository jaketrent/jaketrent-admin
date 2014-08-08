/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.submit}>
          <label className="form-label" for="title">
            Title:
            <input className="form-input form-input-text" id="title" ref="title" type="text" />
          </label>

          <input className="form-input form-input-button" type="submit" value="Create" />
        </form>
      </div>
    )
  }
})