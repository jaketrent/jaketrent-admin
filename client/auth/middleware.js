import * as actions from './actions'
import * as reducer from './reducer'
import * as router from '../common/router'

import store from '../common/store'

// NOTE: synchronous middleware
export default function currentSession(params, next) {
  if (!reducer.isQueried(store.getState().auth)) {
    const unsubscribe = store.subscribe(() => {
      if (reducer.isQueried(store.getState().auth)) {
        unsubscribe()
        if (reducer.isAuthed(store.getState().auth))
          next()
        else
          router.redirect('/login')
      }
    })
    store.dispatch(actions.fetchCurrentSession())
  } else if (!reducer.isAuthed(store.getState().auth)) {
    return router.redirect('/login')
  } else {
    next()
  }
}


