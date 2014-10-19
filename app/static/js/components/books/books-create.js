/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var AppConstants = require('../../common/app-constants')
var AuthenticatedRoute = require('../../common/authenticated-route')
var BooksActions = require('./books-actions')
var BooksCreateStore = require('./books-create-store')
var ErrorInline = require('../../common/error-inline')

module.exports = React.createClass({

  displayName: 'BooksCreate',

  mixins: [ AuthenticatedRoute ],

  getInitialState: function () {
    return this.getStateFromStores()
  },

  getStateFromStores: function () {
    return {
      book: BooksCreateStore.getBook(),
      errors: BooksCreateStore.getErrors()
    }
  },

  componentDidMount: function () {
    BooksCreateStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    BooksCreateStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(this.getStateFromStores(), function () {
      if (BooksCreateStore.isCreated()) {
        Router.transitionTo('books-show', { id: this.state.book.id })
      }
    }.bind(this))
  },

  onSubmit: function (evt) {
    evt.preventDefault()
    BooksActions.create({
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      cover_url: this.refs.cover_url.getDOMNode().value,
      complete_date: this.refs.complete_date.getDOMNode().value,
      review_url: this.refs.review_url.getDOMNode().value
    })
  },

  onClickCancel: function () {
    Router.goBack()
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
          <button className="form-input btn" onClick={this.onClickCancel}>Cancel</button>
        </form>
      </div>
    )
  }
})
