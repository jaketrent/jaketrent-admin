var React = require('react')
var Router = require('react-router')
var Navigation = Router.Navigation

var AppConstants = require('../../common/app-constants')
var AuthenticatedRoute = require('../../common/authenticated-route')
var BooksActions = require('./books-actions')
var BooksCreateStore = require('./books-create-store')
var ErrorInline = require('../../common/error-inline')

module.exports = React.createClass({

  displayName: 'BooksCreate',

  mixins: [ AuthenticatedRoute, Navigation ],

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
    BooksActions.createSelect()
  },

  componentWillUnmount: function () {
    BooksCreateStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(this.getStateFromStores(), function () {
      if (BooksCreateStore.isCreated()) {
        this.transitionTo('books-show', { id: this.state.book.id })
      }
    }.bind(this))
  },

  onSubmit: function (evt) {
    evt.preventDefault()
    BooksActions.create({
      title: this.refs.title.getDOMNode().value,
      author: this.refs.author.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      cover_url: this.refs.cover_url.getDOMNode().value,
      complete_date: this.refs.complete_date.getDOMNode().value,
      review_url: this.refs.review_url.getDOMNode().value,
      affiliate_url: this.refs.affiliate_url.getDOMNode().value
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

          <label className="form-label" htmlFor="author">
            Author:
            <ErrorInline errors={this.state.errors} id="author" />
            <input className="form-input form-input-text"
              id="author" ref="author" type="text" value={this.state.book.author} />
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

          <label className="form-label" htmlFor="affiliate_url">
            Affiliate Url:
            <ErrorInline errors={this.state.errors} id="affiliate_url" />
            <input className="form-input form-input-text"
              id="affiliate_url" ref="affiliate_url" type="text" value={this.state.book.affiliate_url} />
          </label>

          <div className="btn-row">
            <input className="form-input btn btn-secondary" type="submit" value="Create" />
            <button className="form-input btn" onClick={this.onClickCancel}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
})
