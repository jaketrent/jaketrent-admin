/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Link = require('react-router').Link

var BooksActions = require('./books-actions')
var BooksShowStore = require('./books-show-store')

module.exports = React.createClass({

  displayName: 'BooksShow',

  getInitialState: function () {
    return this.getStateFromStores()
  },

  getStateFromStores: function () {
    return {
      book: BooksShowStore.get()
    }
  },

  componentDidMount: function () {
    BooksShowStore.addChangeListener(this._onChange)
    BooksActions.show({ id: this.props.params.id })
  },

  componentWillUnmount: function () {
    BooksShowStore.removeChangeListener(this._onChange)
  },

  _onChange:function(){
    if (this.isMounted()) {
      if (BooksShowStore.hasBook()) {
        this.setState(this.getStateFromStores())
      } else if (BooksShowStore.isDestroyed()) {
        Router.transitionTo('books')
      } else {
        Router.replaceWith('errors', { type: 404 })
      }
    }
  },

  destroy: function () {
    BooksActions.destroy(this.state.book)
  },

  render: function () {
    return (
      <header className="books-header">
        <h2 className="books-title">
          {this.state.book.title}
          <span className="books-title-id">
            {this.state.book.id}
          </span>
        </h2>
        <div className="btn-row books-btns">
          <Link to="books-update" id={this.props.params.id} className="btn">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={this.destroy}>
            Destroy
          </button>
        </div>
        <div className="books-cover-img-container">
          <img className="books-cover-img" src={this.state.book.cover_url} />
        </div>

        <div className="books-description">{this.state.book.description}</div>
        <a href={this.state.book.review_url} className="books-review-url" target="_blank">{this.state.book.review_url}</a>
      </header>
    )
  }
})