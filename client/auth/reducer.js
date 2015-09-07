import TYPES from './types'

export const initialState = {
  currentSessionQueried: false,
  currentSession: null,
  errors: []
}

function handleFetchCurrentSession(state, action) {
  return {
    ...state,
    currentSessionQueried: false
  }
}
function handleFetchCurrentSessionSuccess(state, action) {
  return {
    ...state,
    errors: [],
    currentSession: action.session,
    currentSessionQueried: true
  }
}

function handleFetchCurrentSessionError(state, action) {
  return {
    ...state,
    errors: action.errors
  }
}

export default function reducer(state = initialState, action = {}) {
  const handlers = {
    [TYPES.FETCH_CURRENT_SESSION]: handleFetchCurrentSession,
    [TYPES.FETCH_CURRENT_SESSION_SUCCESS]: handleFetchCurrentSessionSuccess,
    [TYPES.FETCH_CURRENT_SESSION_ERROR]: handleFetchCurrentSessionError,
  }

  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}

export const auth = {
  name: 'auth',
  select(state) {
    return state.auth
  }
}

export function isQueried(state) {
  return state.currentSessionQueried
}

export function isAuthed(state) {
  return state.currentSession != null
}