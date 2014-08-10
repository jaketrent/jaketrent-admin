/** @jsx React.DOM */

var React = require('react')
var BooksActions = require('./books-actions')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      book: {}
    }
  },

  onSubmit: function () {
    BooksActions.create({
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      coverUrl: this.refs.coverUrl.getDOMNode().value,
      reviewLink: this.refs.reviewLink.getDOMNode().value
    })
  },

  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-label" for="title">
            Title:
            <input className="form-input form-input-text"
              id="title" ref="title" type="text" value={this.state.book.title} />
          </label>

          <label className="form-label" for="description">
            Description:
            <textarea className="form-input form-input-textarea"
              id="description" ref="description" value={this.state.book.description}></textarea>
          </label>

          <label className="form-label" for="coverUrl">
            Cover Image:
            <input className="form-input form-input-text"
              id="cover" ref="coverUrl" type="text" value={this.state.book.coverUrl} />
          </label>

          <label className="form-label" for="reviewLink">
            Review Link:
            <input className="form-input form-input-text"
              id="reviewLink" ref="reviewLink" type="text" value={this.state.book.reviewLink} />
          </label>

          <input className="form-input form-input-button form-input-button-primary" type="submit" value="Create" />
        </form>
      </div>
    )
  }
})