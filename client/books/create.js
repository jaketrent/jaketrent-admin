import autobind from 'autobind-decorator'
import React from 'react'

import * as actions from './actions'
import { books } from './reducer'
import connect from '../common/store/connect'
import FieldErrors from '../common/components/field-errors'
import renderWithState from '../common/store/render'

const { func, object, arrayOf } = React.PropTypes

@autobind
class BookForm extends React.Component {
  static propTypes = {
    book: object,
    errors: arrayOf(object),
    onChangeField: func.isRequired,
    onSubmit: func.isRequired
  }
  static defaultProps = {
    book: {},
    errors: []
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.onSubmit(this.props.book)
  }
  handleChange(evt) {
    const fieldName = evt.target.name
    const value = evt.target.value
    this.props.onChangeField(fieldName, value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          <FieldErrors name="title" errors={this.props.errors} />
          <span>Title</span>
          <input type="text" id="title" name="title" value={this.props.book.title} onChange={this.handleChange} />
        </label>
        <label htmlFor="author">
          <FieldErrors name="author" errors={this.props.errors} />
          <span>Author</span>
          <input type="text" id="author" name="author" value={this.props.book.author} onChange={this.handleChange} />
        </label>
        <label htmlFor="description">
          <FieldErrors name="description" errors={this.props.errors} />
          <span>Description</span>
          <textarea id="description" name="description" value={this.props.book.description} onChange={this.handleChange} />
        </label>
        <label htmlFor="coverUrl">
          <FieldErrors name="coverUrl" errors={this.props.errors} />
          <span>Cover URL</span>
          <input type="text" id="coverUrl" name="coverUrl" value={this.props.book.coverUrl} onChange={this.handleChange} />
        </label>
        <label htmlFor="completeDate">
          <FieldErrors name="completeDate" errors={this.props.errors} />
          <span>Complete Date</span>
          <input type="date" id="completeDate" name="completeDate" value={this.props.book.completeDate} onChange={this.handleChange} />
        </label>
        <label htmlFor="affiliateUrl">
          <FieldErrors name="affiliateUrl" errors={this.props.errors} />
          <span>Affiliate URL</span>
          <input type="text" id="affiliateUrl" name="affiliateUrl" value={this.props.book.affiliateUrl} onChange={this.handleChange} />
        </label>
        <label htmlFor="reviewUrl">
          <FieldErrors name="reviewUrl" errors={this.props.errors} />
          <span>Review URL</span>
          <input type="text" id="reviewUrl" name="reviewUrl" value={this.props.book.reviewUrl} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Create" />
      </form>
    )
  }
}


@connect([books], [actions])
class BooksCreateContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Create</h1>
        <BookForm book={this.props.books.newBook}
                  errors={this.props.books.newBookErrors}
                  onSubmit={this.props.books.create}
                  onChangeField={this.props.books.updateNewBook}
        />
      </div>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksCreateContainer, { params }, el)
}