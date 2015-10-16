import React from 'react'
import styleable from 'react-styleable'

import css from './form.css'
import Field from '../../common/components/field'
import Link from '../../common/components/link'

const { func, object, arrayOf, node, string } = React.PropTypes

function handleSubmit(props, evt) {
  evt.preventDefault()
  props.onSubmit(props.book)
}

function handleChange(props, evt) {
  const fieldName = evt.target.name
  const value = evt.target.value
  props.onChangeField(fieldName, value)
}

function renderDestroyButton(props) {
  if (typeof props.onDestroy === 'function')
    return <button onClick={props.onDestroy.bind(null, props.book.id)}
                   rel="nofollow"
                   type="button"
                   className={props.css.btnDestroy}>Delete</button>
}

function renderTitle(props) {
  if (!!props.title)
    return <h1 className={props.css.title}>{props.title}</h1>
}

function BooksForm(props) {
  return (
    <div className={props.css.container}>
      {renderTitle(props)}
      <form onSubmit={handleSubmit.bind(null, props)} className={props.css.form}>
        <div className={props.css.grid}>
          <div className={props.css.col}>
            <Field errors={props.errors}
                   label="Title"
                   isFocused={true}
                   name="title"
                   value={props.book.title}
                   onFieldChange={handleChange.bind(null, props)}
            />
            <Field errors={props.errors}
                   label="Author"
                   name="author"
                   value={props.book.author}
                   onFieldChange={handleChange.bind(null, props)}
            />
            <Field errors={props.errors}
                   label="Cover URL"
                   name="coverUrl"
                   value={props.book.coverUrl}
                   onFieldChange={handleChange.bind(null, props)}
            />
          </div>
          <div className={props.css.col}>
            <Field css={{ input: props.css.inputDescription }}
                   type="textarea"
                   errors={props.errors}
                   label="Description"
                   name="description"
                   value={props.book.description}
                   onFieldChange={handleChange.bind(null, props)}
            />
          </div>
          <div className={props.css.col}>
            <Field errors={props.errors}
                   label="Complete Date"
                   name="completeDate"
                   value={props.book.completeDate}
                   onFieldChange={handleChange.bind(null, props)}
            />
            <Field errors={props.errors}
                   label="Affiliate URL"
                   name="affiliateUrl"
                   value={props.book.affiliateUrl}
                   onFieldChange={handleChange.bind(null, props)}
            />
            <Field errors={props.errors}
                   label="Review URL"
                   name="reviewUrl"
                   value={props.book.reviewUrl}
                   onFieldChange={handleChange.bind(null, props)}
            />
            <div className={props.css.btns}>
              {renderDestroyButton(props)}
              <Link href="/books" className={props.css.btnCancel}>Cancel</Link>
              <input type="submit" value={props.submitLabel} className={props.css.btn} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

BooksForm.propTypes = {
  book: object,
  errors: arrayOf(object),
  onChangeField: func.isRequired,
  onDestroy: func,
  onSubmit: func.isRequired,
  submitLabel: string,
  title: node
}
BooksForm.defaultProps = {
  book: {},
  errors: [],
  submitLabel: 'Create'
}

export default styleable(css)(BooksForm)