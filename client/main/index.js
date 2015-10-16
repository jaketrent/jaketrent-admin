import React from 'react'

import renderWithState from '../common/store/render'
import SiteLayout from '../common/components/layout'
import Welcome from './welcome'

function Main(props) {
  return (
    <SiteLayout>
      <Welcome />
    </SiteLayout>
  )
}

export default function render(el, params) {
  renderWithState(Main, { params }, el)
}