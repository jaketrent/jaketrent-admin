import React from 'react'

import * as router from '../router'

const { string } = React.PropTypes

function Link({ href, ...props }) {
  return (
    <a {...props} href={`${router.baseUrl()}${href}`}>{props.children}</a>
  )
}

Link.propTypes = {
  href: string.isRequired
}

export default Link