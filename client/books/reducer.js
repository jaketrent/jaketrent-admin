import TYPES from './types'

export const initialState = {
  books: [],
  page: 1
}

function fetchSuccess(state, action) {
  return {
    ...state,
    books: action.books,
    page: action.page
  }
}

export default function(state = initialState, action = {}) {
  const handlers = {
    [TYPES.FETCH_SUCCESS]: fetchSuccess
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}

export const books = {
  name: 'books',
  select(state) {
    return state.books
  }
}
