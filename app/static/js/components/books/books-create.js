/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var AppEvents = require('../../common/app-events')
var BooksActions = require('./books-actions')
var BooksEvents = require('./books-events')
var BooksStore = require('./books-store')
var ErrorInline = require('../../common/error-inline')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      book: {},
      errors: []
    }
  },

  componentWillMount: function () {
    BooksStore.addChangeListener(BooksEvents.CREATED, this._onCreated)
    BooksStore.addChangeListener(AppEvents.ERROR, this._onError)
  },

  componentDidUnmount: function () {
    BooksStore.removeChangeListener(BooksEvents.CREATED, this._onCreated)
    BooksStore.removeChangeListener(AppEvents.ERROR, this._onError)
  },

  _onError: function (errOrBodyWithErrors) {
    this.setState({
      errors: errOrBodyWithErrors && errOrBodyWithErrors.errors ? errOrBodyWithErrors.errors : errOrBodyWithErrors
    })
  },

  _onCreated: function(book) {
    Router.transitionTo('book', { id: book.id })
  },

  onSubmit: function () {
    BooksActions.create({
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      cover_url: this.refs.cover_url.getDOMNode().value,
      complete_date: this.refs.complete_date.getDOMNode().value,
      review_url: this.refs.review_url.getDOMNode().value
    })
  },

  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-label" htmlFor="title">
            Title:
            <ErrorInline errors={this.state.errors} id="title" />
            <input className="form-input form-input-text"
              id="title" ref="title" type="text" value={this.state.book.title} />
          </label>

          <label className="form-label" htmlFor="description">
            Description:
            <ErrorInline errors={this.state.errors} id="description" />
            <textarea className="form-input form-input-textarea"
              id="description" ref="description" value={this.state.book.description}></textarea>
          </label>

          <label className="form-label" htmlFor="cover_url">
            Cover Image Url:
            <ErrorInline errors={this.state.errors} id="cover_url" />
            <input className="form-input form-input-text"
              id="cover" ref="cover_url" type="text" value={this.state.book.cover_url} />
          </label>

          <label className="form-label" htmlFor="complete_date">
            Complete Date:
            <ErrorInline errors={this.state.errors} id="complete_date" />
            <input className="form-input form-input-text"
            id="complete_date" ref="complete_date" type="text" value={this.state.book.complete_date} />
          </label>

          <label className="form-label" htmlFor="review_url">
            Review Url:
            <ErrorInline errors={this.state.errors} id="review_url" />
            <input className="form-input form-input-text"
              id="review_url" ref="review_url" type="text" value={this.state.book.review_url} />
          </label>

          <input className="form-input btn btn-secondary" type="submit" value="Create" />
        </form>
      </div>
    )
  }
})