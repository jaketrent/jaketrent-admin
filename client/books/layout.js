import React from 'react'
import styleable from 'react-styleable'

import BooksSideNav from './side-nav'
import css from './layout.css'
import SiteLayout from '../common/components/layout'

const { arrayOf, object } = React.PropTypes

@styleable(css)
export default class BooksLayout extends React.Component {
  static propTypes = {
    books: arrayOf(object)
  }
  static defaultProps = {
    books: []
  }
  render() {
    return (
      <SiteLayout>
        <main className={this.props.css.root}>
          {this.props.children}
        </main>
      </SiteLayout>
    )
  }
}
