import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './form.css'
import Field from '../../common/components/field'

const { func, object, arrayOf, string } = React.PropTypes

@styleable(css)
@autobind
export default class BookForm extends React.Component {
  static propTypes = {
    book: object,
    errors: arrayOf(object),
    onChangeField: func.isRequired,
    onSubmit: func.isRequired,
    submitLabel: string
  }
  static defaultProps = {
    book: {},
    errors: [],
    submitLabel: 'Create'
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
      <form onSubmit={this.handleSubmit} className={this.props.css.form}>
        <div className={this.props.css.grid}>
          <div className={this.props.css.col}>
            <Field errors={this.props.errors}
                   label="Title"
                   name="title"
                   value={this.props.book.title}
                   onFieldChange={this.handleChange}
            />
            <Field errors={this.props.errors}
                   label="Author"
                   name="author"
                   value={this.props.book.author}
                   onFieldChange={this.handleChange}
            />
            <Field errors={this.props.errors}
                   label="Cover URL"
                   name="coverUrl"
                   value={this.props.book.coverUrl}
                   onFieldChange={this.handleChange}
            />
          </div>
          <div className={this.props.css.col}>
            <Field css={{ input: this.props.css.inputDescription }}
                   type="textarea"
                   errors={this.props.errors}
                   label="Description"
                   name="description"
                   value={this.props.book.description}
                   onFieldChange={this.handleChange}
            />
          </div>
          <div className={this.props.css.col}>
            <Field errors={this.props.errors}
                   label="Complete Date"
                   name="completeDate"
                   value={this.props.book.completeDate}
                   onFieldChange={this.handleChange}
            />
            <Field errors={this.props.errors}
                   label="Affiliate URL"
                   name="affiliateUrl"
                   value={this.props.book.affiliateUrl}
                   onFieldChange={this.handleChange}
            />
            <Field errors={this.props.errors}
                   label="Review URL"
                   name="reviewUrl"
                   value={this.props.book.reviewUrl}
                   onFieldChange={this.handleChange}
            />
            <input type="submit" value={this.props.submitLabel} className={this.props.css.btn} />
          </div>
        </div>
      </form>
    )
  }
}
