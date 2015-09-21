import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import CreateBtn from './create-btn'
import css from './table.css'
import Link from '../../common/components/link'

const { arrayOf, object, bool, number, string, oneOfType } = React.PropTypes

@styleable(css)
class Row extends React.Component {
  static propTypes = {
    book: object
  }
  static defaultProps = {
    book: {}
  }
  render() {
    const book = this.props.book
    return (
      <Link href={`/books/${book.id}/edit`} className={this.props.css.link}>
        <article className={this.props.css.row}>
          <div className={this.props.css.cellCover}><img src={book.coverUrl} className={this.props.css.img} /></div>
          <div className={this.props.css.cell}>{book.title}</div>
          <div className={this.props.css.cell}>{book.author}</div>
          <div className={this.props.css.cell}>{book.completeDate}</div>
        </article>
      </Link>
    )
  }
}

@styleable(css)
@autobind
export default class BooksTable extends React.Component {
  static propTypes = {
    books: arrayOf(object),
    isCreating: bool,
    updatingId: oneOfType([string, number])
  }
  static defaultProps = {
    books: [],
    isCreating: false
  }
  renderHeader() {
    return (
      <header className={this.props.css.row}>
        <div className={this.props.css.cellCover}></div>
        <div className={this.props.css.cellHeader}>Book</div>
        <div className={this.props.css.cellHeader}>Author</div>
        <div className={this.props.css.cellHeader}>Completed</div>
      </header>
    )
  }
  renderCreateBtn() {
    return (
      <div className={this.props.css.row}>
        <div className={this.props.css.cellCreate}>
          <CreateBtn />
        </div>
      </div>
    )
  }
  renderCreate() {
    return this.props.isCreating ? this.renderChildForm() : this.renderCreateBtn()
  }
  renderRow(book) {
    return !!this.props.updatingId && parseInt(this.props.updatingId) === book.id
      ? this.renderChildForm()
      : <Row key={book.id} book={book} />
  }
  renderBody(books) {
    return books.map(this.renderRow)
  }
  renderChildForm() {
    return this.props.children
  }
  render() {
    return (
      <div className={this.props.css.table}>
        {this.renderHeader()}
        {this.renderCreate()}
        {this.renderBody(this.props.books)}
      </div>
    )
  }
}
