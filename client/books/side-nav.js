import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import { books } from './reducer'
import css from './side-nav.css'
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

@styleable(css)
class BooksList extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  renderBook(css, book) {
    return (
      <li className={css.item} key={book.id}>
        <Link href={`/books/${book.id}`} className={css.link}>
          {book.title}
        </Link>
      </li>
    )
  }
  renderBooks(css, books) {
    return books.map(this.renderBook.bind(this, css))
  }
  render() {
    return (
      <ul className={this.props.css.list}>
        {this.renderBooks(this.props.css, this.props.books)}
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

@styleable(css)
export default class BooksSideNav extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  render() {
    return (
      <div className={this.props.css.root}>
        <Create />
        <SearchableBooks books={this.props.books} />
      </div>
    )
  }
}
