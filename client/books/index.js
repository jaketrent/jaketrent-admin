import React from 'react'

import * as actions from './actions'
import { books, filter } from './reducer'
import BooksLayout from './components/layout'
import BooksTable from './components/table'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksIndexContainer extends React.Component {
  render() {
    return (
      <BooksLayout books={this.props.books}>
        <BooksTable books={filter(this.props.books)} />
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndexContainer, { params }, el)
}