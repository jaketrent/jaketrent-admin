import React from 'react'

import BooksSideNav from './side-nav'
import SiteLayout from '../common/components/layout'

export default class BooksLayout extends React.Component {
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
