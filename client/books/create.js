import React from 'react'

import * as actions from './actions'
import BookForm from './form'
import BooksLayout from './layout'
import { books } from './reducer'
import connect from '../common/store/connect'
import * as router from '../common/router'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksCreateContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const isBookCreated = !!nextProps.books.newBook.id
    if (isBookCreated)
      router.redirect(`/books/${nextProps.books.newBook.id}`)
  }
  render() {
    return (
      <BooksLayout books={this.props.books.books}>
        <h1>Create</h1>
        <BookForm book={this.props.books.newBook}
                  errors={this.props.books.newBookErrors}
                  onSubmit={this.props.books.create}
                  onChangeField={this.props.books.createBookChange}
        />
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksCreateContainer, { params }, el)
}