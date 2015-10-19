import * as actions from './actions'
import * as router from '../common/router'

export default function logout(el, params) {
  actions.logout()
  router.redirect('/')
}