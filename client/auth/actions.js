import * as api from './api'
import deserializeErrors from '../common/api/deserialize-errors'
import TYPES from './types'

export const name = 'auth'

export function fetchCurrentSessionRequest() {
  return {
    type: TYPES.FETCH_CURRENT_SESSION
  }
}

export function fetchCurrentSessionSuccess(session) {
  return {
    type: TYPES.FETCH_CURRENT_SESSION_SUCCESS,
    session
  }
}

export function fetchCurrentSessionError(errors) {
  return {
    type: TYPES.FETCH_CURRENT_SESSION_ERROR,
    errors
  }
}

export function fetchCurrentSession() {
  const { fetch, deserialize } = api.currentSession
  return async dispatch => {
    try {
      dispatch(fetchCurrentSessionRequest())
      const res = await fetch()
      dispatch(fetchCurrentSessionSuccess(deserialize(res)))
    } catch(resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(fetchCurrentSessionError(deserializeErrors(resOrError)))
    }
  }
}