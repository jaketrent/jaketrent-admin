import React from 'react'
import styleable from 'react-styleable'

import css from './filter.css'
import Field from '../../common/components/field'

const { func, string } = React.PropTypes

function BooksFilter(props) {
  function onTermChange(evt) {
    props.onTermChange(evt.target.value)
  }

  return (
    <div className={props.css.container}>
      <Field isFocused={true}
             isWithErrors={false}
             label="Filter"
             name="filter"
             onFieldChange={onTermChange}
             type="search"
             value={props.term} />
    </div>
  )
}

BooksFilter.propTypes = {
  onTermChange: func.isRequired,
  term: string
}

export default styleable(css)(BooksFilter)