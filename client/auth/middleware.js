import * as actions from './actions'
import { isQueried, isAuthed } from './reducer'
import * as router from '../common/router'

import store from '../common/store'

// NOTE: synchronous middleware
export default function currentSession(params, next) {
  if (!isQueried(store.getState().auth)) {
    const unsubscribe = store.subscribe(() => {
      if (isQueried(store.getState().auth)) {
        unsubscribe()
        if (isAuthed(store.getState().auth))
          next()
        else
          router.redirect('/login')
      }
    })
    store.dispatch(actions.fetchCurrentSession())
  } else if (!isAuthed(store.getState().auth)) {
    return router.redirect('/login')
  } else {
    next()
  }
}


