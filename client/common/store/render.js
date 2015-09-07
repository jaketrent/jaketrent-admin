import { Provider } from 'react-redux'
import React from 'react'

import store from '../store'

export default function renderWithState(Component, props, el) {
  React.render(
    <Provider store={store}>
      {() => <Component {...props} />}
    </Provider>
    , el)
}