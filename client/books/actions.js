import * as api from './api'
import { books } from './reducer'
import TYPES from './types'

export const name = 'books'

export function fetch(planId) {
  return (dispatch, getState) => {
    const state = books.select(getState())
    if (!state.currentPlan || state.currentPlan.id !== planId) {
      api.fetch(planId)
    }

    dispatch({
      type: TYPES.FETCH,
      planId
    })
  }
}

export function fetchSuccess(plan) {
  return {
    type: TYPES.FETCH_SUCCESS,
    plan
  }
}
