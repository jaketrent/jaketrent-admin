import React from 'react'
import styleable from 'react-styleable'

import BooksFilter from './filter'
import css from './tools.css'
import Link from '../../common/components/link'

const { func, string } = React.PropTypes

function BooksTools({ css, ...filterProps }) {
  return (
    <div className={css.container}>
      <BooksFilter {...filterProps} css={{ container: css.filter }} />
      <Link className={css.create} href="/books/create">
        <span className={css.createIcon}>+</span>
        New Book
      </Link>
    </div>
  )
}

BooksTools.propTypes = {
  onTermChange: func.isRequired,
  term: string
}

export default styleable(css)(BooksTools)