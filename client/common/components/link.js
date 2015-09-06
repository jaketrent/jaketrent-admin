import React from 'react'

import * as router from '../router'

const { string } = React.PropTypes

export default class Link extends React.Component {
  static propTypes = {
    href: string.isRequired
  }
  render() {
    const { href, ...props } = this.props
    return (
      <a {...props} href={`${router.baseUrl()}${href}`} ref="link">{this.props.children}</a>
    )
  }
}