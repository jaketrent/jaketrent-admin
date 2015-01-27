var React = require('react/addons')
var Router = require('react-router')

var BooksActions = require('./books-actions')
var BooksStore = require('./books-store')

var Link = Router.Link

module.exports = React.createClass({

  displayName: 'BooksList',

  mixins: [ React.addons.LinkedStateMixin ],

  getInitialState: function () {
    return this.getStateFromStores()
  },

  getStateFromStores: function () {
    return {
      books: BooksStore.find(),
      hasMoreBooks: BooksStore.hasNextPage()
    }
  },

  componentDidMount: function () {
    BooksStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    BooksStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState(this.getStateFromStores())
  },

  handleLoadMoreClick: function () {
    BooksActions.fetch()
  },

  renderCreate: function () {
    return (
      <li className="sidebar-item sidebar-item-no-link sidebar-item-create" key="books-create">
        <Link to="books-create" className="btn btn-full btn-secondary sidebar-create-btn">
          Create New
        </Link>
      </li>
    )
  },

  renderSearch: function () {
    return (
      <li className="sidebar-item sidebar-item-no-link sidebar-item-search" key="books-search">
        <input type="text" className="form-input form-input-text form-input-search sidebar-search-input"
          placeholder="Search" ref="booksSearch" valueLink={this.linkState('searchTerm')} />
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
        <Link className="sidebar-link" to="books-show" params={{ id: book.id}}>
          {book.title}
        </Link>
      </li>
    )
  },

  renderMoreButton: function () {
    if (this.state.hasMoreBooks)
      return (
        <li className="sidebar-item" key="loadmore-btn">
          <button className="sidebar-load-more" onClick={this.handleLoadMoreClick}>Load More</button>
        </li>
      )
  },

  render: function () {
    return (
      <section className="sidebar">
        <ul className="sidebar-list">
          {this.renderCreate()}
          {this.renderSearch()}
          {this.renderBooks(this.state.books)}
          {this.renderMoreButton()}
        </ul>
      </section>
    )
  }
})