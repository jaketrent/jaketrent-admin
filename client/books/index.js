import React from 'react'

import { books } from './reducer'
import BooksLayout from './layout'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([books])
class BooksIndexContainer extends React.Component {
  render() {
    return (
      <BooksLayout books={this.props.books.books}>
        Go away, read some books!
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndexContainer, { params }, el)
}