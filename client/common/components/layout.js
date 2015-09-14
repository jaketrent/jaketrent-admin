import React from 'react'

import Link from './link'

export default class SiteLayout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h2>jaketrent-admin</h2>
        </header>
        <nav>
          <Link href="/books">Books</Link>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
