import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import store from '../store'

export default function renderWithState(Component, props, el) {
  ReactDOM.render(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  , el)
}