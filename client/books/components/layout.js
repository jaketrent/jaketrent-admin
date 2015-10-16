import React from 'react'
import styleable from 'react-styleable'

import BooksTools from './tools'
import css from './layout.css'
import { hasNextPage } from '../reducer'
import LoadMore from '../../common/components/load-more'
import SiteLayout from '../../common/components/layout'

const { arrayOf, object } = React.PropTypes

function renderLoadMore(state) {
  if (hasNextPage(state))
    return <LoadMore onLoad={state.fetchMore} />
}

function BooksLayout(props) {
  return (
    <SiteLayout>
      <main className={props.css.root}>
        <BooksTools term={props.books.searchTerm}
                    onTermChange={props.books.searchChange} />
        {props.children}
        {renderLoadMore(props.books)}
      </main>
    </SiteLayout>
  )
}

BooksLayout.propTypes = {
  books: object.isRequired
}

export default styleable(css)(BooksLayout)