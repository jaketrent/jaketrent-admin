import React from 'react'
import styleable from 'react-styleable'

import css from './layout.css'
import Link from './link'

function SiteLayout(props) {
  return (
    <div className={props.css.root}>
      <div className={props.css.topbar}>
        <header className={props.css.header}>
          <h2 className={props.css.title}>puppetmaster</h2>
        </header>
        <nav className={props.css.nav}>
          <Link className={props.css.link} href="/books">Books</Link>
        </nav>
      </div>
      <div className={props.css.main}>
        {props.children}
      </div>
    </div>
  )
}

export default styleable(css)(SiteLayout)