import React from 'react'
import styleable from 'react-styleable'

import BooksFilter from './filter'
import css from './tools.css'
import Link from '../../common/components/link'

const { func, string } = React.PropTypes

@styleable(css)
export default class BooksTools extends React.Component {
  static propTypes = {
    onTermChange: func.isRequired,
    term: string
  }
  render() {
    const { css, ...filterProps } = this.props
    return (
      <div className={this.props.css.container}>
        <BooksFilter {...filterProps} css={{ container: this.props.css.filter }} />
        <Link className={this.props.css.create} href="/books/create">
          <span className={this.props.css.createIcon}>+</span>
          New Book
        </Link>
      </div>
    )
  }
}