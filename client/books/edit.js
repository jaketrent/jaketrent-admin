import autobind from 'autobind-decorator'
import React from 'react'

import * as actions from './actions'
import BookForm from './components/form'
import BooksLayout from './layout'
import BooksTable from './components/table'
import { books, findBook } from './reducer'
import connect from '../common/store/connect'
import * as router from '../common/router'
import renderWithState from '../common/store/render'

@connect([books], [actions])
@autobind
class BooksEditContainer extends React.Component {
  componentWillMount() {
    this.transitionMaybe(this.props)
  }
  componentWillReceiveProps(nextProps) {
    const noBookToUpdate = !nextProps.books.updateBook

    if (noBookToUpdate) {
      const currentIds = this.props.books.books.map(b => b.id).sort()
      const nextIds = nextProps.books.books.map(b => b.id).sort()
      const booksListDiffers = currentIds !== nextIds

      if (booksListDiffers)
        this.transitionMaybe(nextProps)
    } else {
      const currentUrl = this.props.params.bookId
      const nextUrl = nextProps.params.bookId
      const urlChanged = currentUrl !== nextUrl

      if (urlChanged)
        this.transitionMaybe(nextProps)
    }

    if (nextProps.books.updateIsSuccess)
      router.redirect(`/books`)
  }
  transitionMaybe(props) {
    const book = findBook(props.books, props.params.bookId)
    if (book)
      props.books.updateTransition(book)
  }
  handleDestroy(bookId) {
    if (confirm('Confirm remove?'))
      this.props.books.destroy(bookId)
  }
  renderLoading(props) {
    return (
      <BooksLayout books={props.books.books}>
        <BooksTable books={props.books.books}>
        </BooksTable>
      </BooksLayout>
    )
  }
  renderPage(props, book) {
    return (
      <BooksLayout books={props.books.books}>
        <BooksTable books={props.books.books}
                    updatingId={book.id}>
          <BookForm book={book}
                    errors={props.books.updateBookErrors}
                    onSubmit={props.books.update}
                    onChangeField={props.books.updateBookChange}
                    onDestroy={this.handleDestroy}
                    submitLabel="Edit"
          />
        </BooksTable>
      </BooksLayout>
    )
  }
  render() {
    const book = this.props.books.updateBook
    if (!!book)
      return this.renderPage(this.props, book)
    else
      return this.renderLoading(this.props)
  }
}

export default function render(el, params) {
  renderWithState(BooksEditContainer, { params }, el)
}