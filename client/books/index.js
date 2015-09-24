import React from 'react'

import * as actions from './actions'
import { books, hasNextPage } from './reducer'
import BooksLayout from './layout'
import BooksTable from './components/table'
import connect from '../common/store/connect'
import LoadMore from '../common/components/load-more'
import renderWithState from '../common/store/render'

@connect([books], [actions])
class BooksIndexContainer extends React.Component {
  renderLoadMore(state) {
    if (hasNextPage(state))
      return <LoadMore onLoad={this.props.books.fetchMore} />
  }
  render() {
    return (
      <BooksLayout>
        <BooksTable books={this.props.books.books} />
        {this.renderLoadMore(this.props.books)}
      </BooksLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndexContainer, { params }, el)
}