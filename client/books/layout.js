import React from 'react'

import BooksSideNav from './side-nav'
import SiteLayout from '../common/components/layout'

const { arrayOf, object } = React.PropTypes

export default class BooksLayout extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  render() {
    return (
      <SiteLayout>
        <BooksSideNav books={this.props.books} />
        <main>
          {this.props.children}
        </main>
      </SiteLayout>
    )
  }
}
