import React from 'react'

import * as actions from './actions'
import BookForm from './components/form'
import BooksLayout from './layout'
import { books, findBook } from './reducer'
import connect from '../common/store/connect'
import * as router from '../common/router'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksEditContainer extends React.Component {
  componentWillMount() {
    this.transitionMaybe(this.props)
  }
  componentWillReceiveProps(nextProps) {
    // TODO: test for 2nd update clobbering first book
    if (!nextProps.books.updateBook)
      this.transitionMaybe(nextProps)

    if (nextProps.books.updateIsComplete)
      router.redirect(`/books/${nextProps.params.bookId}`)
  }
  transitionMaybe(props) {
    const book = findBook(props.books, props.params.bookId)
    if (book)
      props.books.updateTransition(book)
  }
  renderLoading() {
    return <div>Loading...</div>
  }
  renderPage(props, book) {
    return (
      <BooksLayout books={props.books.books}>
        <h1>Edit {book.title} ({book.id})</h1>
        <BookForm book={book}
                  errors={props.books.updateBookErrors}
                  onSubmit={props.books.update}
                  onChangeField={props.books.updateBookChange}
                  submitLabel="Edit"
          />
      </BooksLayout>
    )
  }
  render() {
    const book = this.props.books.updateBook
    if (!!book)
      return this.renderPage(this.props, book)
    else
      return this.renderLoading()
  }
}

export default function render(el, params) {
  renderWithState(BooksEditContainer, { params }, el)
}