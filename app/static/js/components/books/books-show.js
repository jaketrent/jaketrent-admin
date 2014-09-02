/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Link = require('react-router').Link

var BooksActions = require('./books-actions')
var BooksShowStore = require('./books-show-store')

module.exports = React.createClass({

  getInitialState: function () {
    return BooksShowStore.getState()
  },

  componentDidMount: function () {
    BooksShowStore.addChangeListener(this._onChange)
    BooksActions.show({ id: this.props.params.id })
  },

  componentDidUnmount: function () {
    BooksShowStore.removeChangeListener(this._onChange)
  },

  _onChange:function(){
    if (this.isMounted()) {
      this.setState(BooksShowStore.getState())
      if (BooksShowStore.isDone())
        Router.transitionTo('books')
    }
  },

  destroy: function () {
    BooksActions.destroy(this.state.book)
  },

  render: function () {
    return (
      <header className="books-header">
        <h2 className="books-title">Book {this.state.book.id}</h2>
        <Link to="books-update" id={this.props.params.id} className="btn">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={this.destroy}>
          Destroy
        </button>
        <div>{this.state.book.title}</div>
        <div>{this.state.book.description}</div>
        <div><img src={this.state.book.cover_url} /></div>
        <div>{this.state.book.review_url}</div>
      </header>
    )
  }
})