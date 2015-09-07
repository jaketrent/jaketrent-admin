import React from 'react'

import connect from '../common/store/connect'
import { books, findBook } from './reducer'
import renderWithState from '../common/store/render'

const { object } = React.PropTypes

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

class BooksShow extends React.Component {
  static propTypes = {
    book: object
  }
  static defaultProps = {
    book: {}
  }
  render() {
    return (
      <BookDetail book={this.props.book} />
    )
  }
}

@connect([books])
class BooksShowContainer extends React.Component {
  render() {
    return (
      <div>
        <BooksShow book={findBook(this.props.books, this.props.params.bookId)} />
      </div>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksShowContainer, { params }, el)
}