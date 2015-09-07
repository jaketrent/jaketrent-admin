import autobind from 'autobind-decorator'
import React from 'react'

import { books } from './reducer'
import Link from '../common/components/link'

const { arrayOf, object } = React.PropTypes

class Create extends React.Component {
  render() {
    return (
      <li>
        <Link href="/books/create">
          Create New
        </Link>
      </li>
    )
  }
}

@autobind
class Search extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired
  }
  handleChange(evt) {
    this.props.onChange(evt.target.value)
  }
  render() {
    return (
      <li>
        <input onChange={this.handleChange} type="text" placeholder="Search" />
      </li>
    )
  }
}

class BooksList extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  renderBook(book) {
    return (
      <li key={book.id}>
        <Link href={`/books/${book.id}`}>
          {book.title}
        </Link>
      </li>
    )
  }
  renderBooks(books) {
    return books.map(this.renderBook)
  }
  render() {
    return (
      <ul>
        {this.renderBooks(this.props.books)}
      </ul>
    )
  }
}

@autobind
class SearchableBooks extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  state = { term: null }
  handleSearch(term) {
    this.setState({
      term
    })
  }
  getSearchedBooks(term) {
    return term
      ? this.props.books.filter(book => {
      return book.title.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
      : this.props.books
  }
  render() {
    return (
      <div>
        <Search onChange={this.handleSearch} />
        <BooksList books={this.getSearchedBooks(this.state.term)} />
      </div>
    )
  }
}

export default class BooksSideNav extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  render() {
    return (
      <div>
        <Create />
        <SearchableBooks books={this.props.books} />
      </div>
    )
  }
}
