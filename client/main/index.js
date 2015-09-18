import React from 'react'

import renderWithState from '../common/store/render'
import SiteLayout from '../common/components/layout'

class Main extends React.Component {
  render() {
    return (
      <SiteLayout>
        Welcome, puppetmaster
      </SiteLayout>
    )
  }
}

export default function render(el, params) {
  renderWithState(Main, { params }, el)
}