import React from 'react'

import * as actions from './actions'
import { books } from './reducer'
import BooksLayout from './layout'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksIndexContainer extends React.Component {
  componentDidMount() {
    this.props.books.fetch()
  }
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