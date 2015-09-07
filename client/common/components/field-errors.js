import React from 'react'

import errorsUtil from '../errors'

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
      <li key={i}>
        {error.detail}
      </li>
    )
  }
  renderErrors(errors) {
    return errors.filter(errorsUtil.isFor.bind(null, this.props.name)).map(this.renderError)
  }
  render() {
    if (errorsUtil.existFor(this.props.name, this.props.errors))
      return (
        <div>
          <div>Error</div>
          <ul>{this.renderErrors(this.props.errors)}</ul>
        </div>
      )
    else
      return null
  }
}
