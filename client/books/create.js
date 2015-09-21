import React from 'react'

import * as actions from './actions'
import BooksCreateForm from './components/create-form'
import BooksLayout from './layout'
import BooksTable from './components/table'
import { books } from './reducer'
import connect from '../common/store/connect'
import * as router from '../common/router'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksCreateContainer extends React.Component {
  componentWillMount() {
    this.props.books.createTransition()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.books.createIsComplete)
      router.redirect('/books')
  }
  render() {
    return (
      <BooksLayout>
        <BooksTable books={this.props.books.books}
                    isCreating={true}>
          <BooksCreateForm book={this.props.books.newBook}
                           errors={this.props.books.newBookErrors}
                           onSubmit={this.props.books.create}
                           onChangeField={this.props.books.createBookChange} />
        </BooksTable>
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksCreateContainer, { params }, el)
}