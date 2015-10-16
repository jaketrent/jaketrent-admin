import React from 'react'
import styleable from 'react-styleable'

import BooksTools from './tools'
import css from './layout.css'
import { hasNextPage } from '../reducer'
import LoadMore from '../../common/components/load-more'
import SiteLayout from '../../common/components/layout'

const { arrayOf, object } = React.PropTypes

@styleable(css)
export default class BooksLayout extends React.Component {
  static propTypes = {
    books: object.isRequired
  }
  renderLoadMore(state) {
    if (hasNextPage(state))
      return <LoadMore onLoad={this.props.books.fetchMore} />
  }
  render() {
    return (
      <SiteLayout>
        <main className={this.props.css.root}>
          <BooksTools term={this.props.books.searchTerm}
                      onTermChange={this.props.books.searchChange} />
          {this.props.children}
          {this.renderLoadMore(this.props.books)}
        </main>
      </SiteLayout>
    )
  }
}
