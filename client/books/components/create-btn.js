import React from 'react'
import styleable from 'react-styleable'

import css from './create-btn.css'
import Link from '../../common/components/link'

@styleable(css)
export default class Create extends React.Component {
  render() {
    return (
      <Link className={this.props.css.btn} href="/books/create">
        +
      </Link>
    )
  }
}