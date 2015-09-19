import React from 'react'
import styleable from 'react-styleable'

import css from './create-btn.css'
import Link from '../../common/components/link'

@styleable(css)
export default class Create extends React.Component {
  render() {
    return (
      <div className={this.props.css.root}>
        <Link className={this.props.css.btn} href="/books/create">
          Create New
        </Link>
      </div>
    )
  }
}