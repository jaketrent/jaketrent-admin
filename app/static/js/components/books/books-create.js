/** @jsx React.DOM */

var React = require('react')
var BooksActions = require('./books-actions')

module.exports = React.createClass({
  onSubmit: function () {
    BooksActions.create({
      title: this.refs.title.getDOMNode().value
    })
  },

  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.onSubmit}>
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