import React from 'react'
import styleable from 'react-styleable'

import css from './layout.css'
import Link from './link'

@styleable(css)
export default class SiteLayout extends React.Component {
  render() {
    return (
      <div className={this.props.css.root}>
        <div className={this.props.css.topbar}>
          <header className={this.props.css.header}>
            <h2 className={this.props.css.title}>puppetmaster</h2>
          </header>
          <nav className={this.props.css.nav}>
            <Link className={this.props.css.link} href="/books">Books</Link>
          </nav>
        </div>
        <div className={this.props.css.main}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
