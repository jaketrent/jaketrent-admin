import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './field-errors.css'
import errorsUtil from '../errors'

@styleable(css)
@autobind
export default class FieldErrors extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    errors: React.PropTypes.arrayOf(React.PropTypes.shape({
      field: React.PropTypes.string,
      detail: React.PropTypes.string
    }))
  }
  static defaultProps = {
    errors: []
  }
  renderError(error, i) {
    return (
      <li key={i} className={this.props.css.error}>
        {error.detail}
      </li>
    )
  }
  renderErrors(errors) {
    if (errorsUtil.existFor(this.props.name, this.props.errors))
      return (
        <ul className={this.props.css.errors}>
          {errors.filter(errorsUtil.isFor.bind(null, this.props.name)).map(this.renderError)}
        </ul>
      )
  }
  render() {
    return (
      <div className={this.props.css.container}>
        {this.renderErrors(this.props.errors)}
      </div>
    )
  }
}
