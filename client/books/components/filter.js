import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './filter.css'
import Field from '../../common/components/field'

const { func, string } = React.PropTypes

@styleable(css)
@autobind
export default class BooksFilter extends React.Component {
  static propTypes = {
    onTermChange: func.isRequired,
    term: string
  }
  onTermChange(evt) {
    this.props.onTermChange(evt.target.value)
  }
  render() {
    return (
      <div className={this.props.css.container}>
        <Field isFocused={true}
               isWithErrors={false}
               label="Filter"
               name="filter"
               onFieldChange={this.onTermChange}
               type="search"
               value={this.props.term} />
      </div>
    )
  }
}