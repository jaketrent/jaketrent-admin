import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './form.css'
import Field from '../../common/components/field'
import Link from '../../common/components/link'

const { func, object, arrayOf, node, string } = React.PropTypes

@styleable(css)
@autobind
export default class BookForm extends React.Component {
  static propTypes = {
    book: object,
    errors: arrayOf(object),
    onChangeField: func.isRequired,
    onDestroy: func,
    onSubmit: func.isRequired,
    submitLabel: string,
    title: node
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
  renderDestroyButton() {
    if (typeof this.props.onDestroy === 'function')
      return <button onClick={this.props.onDestroy.bind(this, this.props.book.id)}
                     rel="nofollow"
                     type="button"
                     className={this.props.css.btnDestroy}>Delete</button>
  }
  renderTitle() {
    if (!!this.props.title)
      return <h1 className={this.props.css.title}>{this.props.title}</h1>
  }
  render() {
    return (
      <div className={this.props.css.container}>
      {this.renderTitle()}
        <form onSubmit={this.handleSubmit} className={this.props.css.form}>
          <div className={this.props.css.grid}>
            <div className={this.props.css.col}>
              <Field errors={this.props.errors}
                     label="Title"
                     isFocused={true}
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
              <div className={this.props.css.btns}>
                {this.renderDestroyButton()}
                <Link href="/books" className={this.props.css.btnCancel}>Cancel</Link>
                <input type="submit" value={this.props.submitLabel} className={this.props.css.btn} />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
