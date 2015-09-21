import React from 'react'
import styleable from 'react-styleable'

import BookForm from './form'
import css from './create-form.css'

const { arrayOf, object, func } = React.PropTypes

@styleable(css)
export default class BooksCreateForm extends React.Component {
  static propTypes = {
    book: object,
    errors: arrayOf(object),
    onSubmit: func.isRequired,
    onChangeField: func.isRequired
  }
  static defaultProps = {
    book: {},
    errors: []
  }
  render() {
    return (
      <div className={this.props.css.container}>
        <h1 className={this.props.css.title}>Create</h1>
        <BookForm book={this.props.book}
                  errors={this.props.errors}
                  onSubmit={this.props.onSubmit}
                  onChangeField={this.props.onChangeField}
        />
      </div>
    )
  }
}
