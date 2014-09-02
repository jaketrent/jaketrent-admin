/** @jsx React.DOM */

var extend = require('lodash-node/modern/objects/assign')
var React = require('react')
var Router = require('react-router')

var AppConstants = require('../../common/app-constants')
var BooksActions = require('./books-actions')
var BooksUpdateStore = require('./books-update-store')
var BooksStore = require('./books-store')
var ErrorInline = require('../../common/error-inline')

module.exports = React.createClass({

  getInitialState: function () {
    return extend({
      errors: []
    }, BooksStore.getState({ id: this.props.params.id }))
  },

  componentDidMount: function () {
    BooksUpdateStore.addChangeListener(this._onChange)
    BooksActions.fetch({ id: this.props.params.id })
  },

  componentDidUnmount: function () {
    BooksUpdateStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    if (this.isMounted())
      this.setState(BooksUpdateStore.getState(), function () {
        if (BooksUpdateStore.isDone()) {
          Router.transitionTo('books-show', { id: this.props.params.id })
        }
      })
  },

  updateState: function (evt) {
    var book = this.state.book
    book[evt.target.name] = evt.target.value
    this.setState({
      book: book
    })
  },

  onSubmit: function (evt) {
    evt.preventDefault()
    BooksActions.update(this.state.book)
  },

  render: function () {
    return (
      <div className="body">
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-label" htmlFor="title">
            Title:
            <ErrorInline errors={this.state.errors} id="title" />
            <input className="form-input form-input-text" name="title"
              id="title" ref="title" type="text" value={this.state.book.title} onChange={this.updateState} />
          </label>

          <label className="form-label" htmlFor="description">
            Description:
            <ErrorInline errors={this.state.errors} id="description" />
            <textarea className="form-input form-input-textarea" name="description"
              id="description" ref="description" value={this.state.book.description} onChange={this.updateState}></textarea>
          </label>

          <label className="form-label" htmlFor="cover_url">
            Cover Image Url:
            <ErrorInline errors={this.state.errors} id="cover_url" />
            <input className="form-input form-input-text" name="cover_url"
              id="cover" ref="cover_url" type="text" value={this.state.book.cover_url} onChange={this.updateState} />
          </label>

          <label className="form-label" htmlFor="complete_date">
            Complete Date:
            <ErrorInline errors={this.state.errors} id="complete_date" />
            <input className="form-input form-input-text" name="complete_date"
             id="complete_date" ref="complete_date" type="text" value={this.state.book.complete_date} onChange={this.updateState} />
          </label>

          <label className="form-label" htmlFor="review_url">
            Review Url:
            <ErrorInline errors={this.state.errors} id="review_url" />
            <input className="form-input form-input-text" name="review_url"
             id="review_url" ref="review_url" type="text" value={this.state.book.review_url} onChange={this.updateState} />
          </label>

          <input className="form-input btn btn-secondary" type="submit" value="Edit" />
        </form>
      </div>
    )
  }
})