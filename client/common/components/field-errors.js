import React from 'react'
import styleable from 'react-styleable'

import css from './field-errors.css'
import errorsUtil from '../errors'

function renderError(props, error, i) {
  return (
    <li key={i} className={props.css.error}>
      {error.detail}
    </li>
  )
}

function renderErrors(props) {
  if (errorsUtil.existFor(props.name, props.errors))
    return (
      <ul className={props.css.errors}>
        {props.errors
          .filter(errorsUtil.isFor.bind(null, props.name))
          .map(renderError.bind(null, props))}
      </ul>
    )
}

function FieldErrors(props) {
  return (
    <div className={props.css.container}>
      {renderErrors(props)}
    </div>
  )
}

FieldErrors.propTypes = {
  name: React.PropTypes.string.isRequired,
  errors: React.PropTypes.arrayOf(React.PropTypes.shape({
    field: React.PropTypes.string,
    detail: React.PropTypes.string
  }))
}
FieldErrors.defaultProps = {
  errors: []
}

export default styleable(css)(FieldErrors)