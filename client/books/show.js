import React from 'react'

import * as actions from './actions'
import BooksLayout from './layout'
import { books, findBook } from './reducer'
import connect from '../common/store/connect'
import Link from '../common/components/link'
import renderWithState from '../common/store/render'
import * as router from '../common/router'

const { object, func } = React.PropTypes

class BookDetail extends React.Component {
  static propTypes = {
    book: object
  }
  static defaultProps = {
    book: {}
  }
  render() {
    const book = this.props.book
    return (
      <div>
        <h1>{book.title} ({book.id})</h1>
        <div>{book.author}</div>
        <p>{book.description}</p>
        <img src={book.coverUrl} />
        <time>{book.completeDate}</time>
        <a href={book.affiliateUrl}>{book.affiliateUrl}</a>
        <a href={book.reviewUrl}>{book.reviewUrl}</a>
      </div>
    )
  }
}

class BookNav extends React.Component {
  handleRemove(bookId) {
    if (confirm('Confirm remove?'))
      this.props.onRemove(bookId)
  }
  render() {
    return (
      <nav>
        <Link href={`/books/${this.props.bookId}/edit`}>Edit</Link>
        <button onClick={this.handleRemove.bind(this, this.props.bookId)}>Delete</button>
      </nav>
    )
  }
}


class BooksShow extends React.Component {
  static propTypes = {
    book: object,
    onRemove: func.isRequired
  }
  static defaultProps = {
    book: {}
  }
  render() {
    return (
      <div>
        <BookNav bookId={this.props.book.id}
                 onRemove={this.props.onRemove} />
        <BookDetail book={this.props.book} />
      </div>
    )
  }
}

@connect([books], [actions])
class BooksShowContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    const isBookDeleted = !this.getBook(nextProps)
    if (isBookDeleted)
      router.redirect('/books')
    // TODO: handle 404 if I want/need to
  }
  getBook(props) {
    return findBook(props.books, props.params.bookId)
  }
  render() {
    return (
      <BooksLayout books={this.props.books.books}>
        <BooksShow book={this.getBook(this.props)}
                   onRemove={this.props.books.destroy}
        />
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksShowContainer, { params }, el)
}