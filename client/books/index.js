import React from 'react'

import * as actions from './actions'
import { books } from './reducer'
import BooksSideNav from './side-nav'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksIndexContainer extends React.Component {
  componentDidMount() {
    this.props.books.fetch()
  }
  render() {
    return (
      <div>
        BooksIndex
        <BooksSideNav books={this.props.books.books} />
      </div>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndexContainer, { params }, el)
}