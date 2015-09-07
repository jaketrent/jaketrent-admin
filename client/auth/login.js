import autobind from 'autobind-decorator'
import React from 'react'

import * as actions from './actions'
import * as config from '../config'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([], [actions])
@autobind
class Login extends React.Component {
  // TODO: move this into action?
  handleSignin() {
    function openWindow(url, title, width, height) {
      var left = (window.screen.width / 2) - (width / 2)
      var top = (window.screen.height / 2) - (height / 2)
      return window.open(url, title, 'location=0,status=0,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left)
    }

    const openedWin = openWindow(config.at('apiHost') + '/auth/login', 'Login', 800, 600)
    this.interval = window.setInterval(() => {
      if (openedWin.closed) {
        window.clearInterval(this.interval)
        this.props.auth.fetchCurrentSession()
      }
    }, 1000)
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.handleSignin}>Sign in with Twitter</button>
      </div>
    )
  }
}

export default function render(el, params) {
  renderWithState(Login, { params }, el)
}