/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

var BooksStore = require('./books-store')

module.exports = React.createClass({
  displayName: 'BooksList',

  getInitialState: function () {
    return {
      books: BooksStore.find()
    }
  },

  componentWillMount: function () {
    BooksStore.addChangeListener(this._onChange)
  },

  componentDidUnmount: function () {
    BooksStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState({
      books: BooksStore.find()
    })
  },

  renderBooks: function (books) {
    return books.map(this.renderBook)
  },

  renderBook: function (book) {
    return (
      <li className="sidebar-item" key={book.id}>
        <Link className="sidebar-link" to="book" id={book.id}>
          {book.title}
        </Link>
      </li>
    )
  },

  render: function () {
    return (
      <section className="sidebar">
        <ul className="sidebar-list">
          {this.renderBooks(this.state.books)}
        </ul>
      </section>
    )
  }
})