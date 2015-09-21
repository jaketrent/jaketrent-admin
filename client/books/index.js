import React from 'react'

import { books } from './reducer'
import BooksLayout from './layout'
import BooksTable from './components/table'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([books])
class BooksIndexContainer extends React.Component {
  render() {
    return (
      <BooksLayout>
        <BooksTable books={this.props.books.books} />
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndexContainer, { params }, el)
}