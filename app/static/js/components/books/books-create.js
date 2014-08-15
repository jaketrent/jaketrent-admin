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
    console.log(errOrBodyWithErrors)
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
      coverUrl: this.refs.coverUrl.getDOMNode().value,
      completeDate: this.refs.completeDate.getDOMNode().value,
      reviewLink: this.refs.reviewLink.getDOMNode().value
    })
  },

  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-label" htmlFor="title">
            Title:
            <ErrorInline errors={this.state.errors} param="books.0.title" />
            <input className="form-input form-input-text"
              id="title" ref="title" type="text" value={this.state.book.title} />
          </label>

          <label className="form-label" htmlFor="description">
            Description:
            <ErrorInline errors={this.state.errors} param="books.0.description" />
            <textarea className="form-input form-input-textarea"
              id="description" ref="description" value={this.state.book.description}></textarea>
          </label>

          <label className="form-label" htmlFor="coverUrl">
            Cover Image Url:
            <ErrorInline errors={this.state.errors} param="books.0.coverUrl" />
            <input className="form-input form-input-text"
              id="cover" ref="coverUrl" type="text" value={this.state.book.coverUrl} />
          </label>

          <label className="form-label" htmlFor="completeDate">
          Complete Date:
            <ErrorInline errors={this.state.errors} param="books.0.completeDate" />
            <input className="form-input form-input-text"
            id="completeDate" ref="completeDate" type="text" value={this.state.book.completeDate} />
          </label>

          <label className="form-label" htmlFor="reviewLink">
            Review Url:
            <ErrorInline errors={this.state.errors} param="books.0.reviewUrl" />
            <input className="form-input form-input-text"
              id="reviewLink" ref="reviewLink" type="text" value={this.state.book.reviewLink} />
          </label>

          <input className="form-input form-input-button form-input-button-primary" type="submit" value="Create" />
        </form>
      </div>
    )
  }
})