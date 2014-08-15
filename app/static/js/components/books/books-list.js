/** @jsx React.DOM */

var React = require('react/addons')
var Link = require('react-router').Link

var BooksStore = require('./books-store')

module.exports = React.createClass({

  displayName: 'BooksList',

  mixins: [ React.addons.LinkedStateMixin ],

  getInitialState: function () {
    return {
      books: BooksStore.find()
    }
  },

  componentWillMount: function () {
    BooksStore.addChangeListener(this.onChangeStore)
  },

  componentDidUnmount: function () {
    BooksStore.removeChangeListener(this.onChangeStore)
  },

  onChangeStore: function() {
    this.setState({
      books: BooksStore.find()
    })
  },

  renderSearch: function () {
    return (
      <li className="sidebar-item sidebar-item-search" key="books-search">
        <input type="text" className="form-input form-input-text form-input-search sidebar-search-input"
          placholder="Search" ref="booksSearch" valueLink={this.linkState('searchTerm')}  />
      </li>
    )
  },

  renderBooks: function (books) {
    var filtered = books

    if (this.state.searchTerm)
      filtered = filtered.filter(function (book) {
        return book.title.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
      }.bind(this))

    return filtered.map(this.renderBook)
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
          {this.renderSearch()}
          {this.renderBooks(this.state.books)}
        </ul>
      </section>
    )
  }
})