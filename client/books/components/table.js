import React from 'react'
import styleable from 'react-styleable'

import css from './table.css'
import Link from '../../common/components/link'

const { arrayOf, object, bool, number, string, oneOfType } = React.PropTypes

function Row(props) {
  const book = props.book
  return (
    <Link href={`/books/${book.id}/edit`} className={props.css.link}>
      <article className={props.css.row}>
        <div className={props.css.cellCover}><img src={book.coverUrl} className={props.css.img} /></div>
        <div className={props.css.cell}>{book.title}</div>
        <div className={props.css.cell}>{book.author}</div>
        <div className={props.css.cell}>{book.completeDate}</div>
      </article>
    </Link>
  )
}

Row.propTypes = {
  book: object
}

Row.defaultProps = {
  book: {}
}

function renderHeader(props) {
  return (
    <header className={props.css.row}>
      <div className={props.css.cellCover}></div>
      <div className={props.css.cellHeader}>Book</div>
      <div className={props.css.cellHeader}>Author</div>
      <div className={props.css.cellHeader}>Completed</div>
    </header>
  )
}

function renderCreate(props) {
  return props.isCreating ? renderChildForm(props) : null
}

function renderRow(props, book) {
  return !!props.updatingId && parseInt(props.updatingId) === book.id
    ? renderChildForm(props)
    : <Row key={book.id} book={book} css={props.css} />
}

function renderBody(props) {
  return props.books.map(renderRow.bind(null, props))
}

function renderChildForm(props) {
  return props.children
}

function BooksTable(props) {
  return (
    <div className={props.css.table}>
      {renderHeader(props)}
      {renderCreate(props)}
      {renderBody(props)}
    </div>
  )
}

BooksTable.propTypes = {
  books: arrayOf(object),
  isCreating: bool,
  updatingId: oneOfType([string, number])
}
BooksTable.defaultProps = {
  books: [],
  isCreating: false
}

export default styleable(css)(BooksTable)
