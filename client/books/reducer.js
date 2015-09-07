import find from 'lodash/collection/find'
import uniq from 'lodash/array/uniq'

import TYPES from './types'

export const initialState = {
  books: [],
  page: 1
}

function fetchSuccess(state, action) {
  return {
    ...state,
    books: uniq(state.books.concat(action.books), b => b.id),
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

// TODO: think about where besides reducer.js that these functions might belong

export const books = {
  name: 'books',
  select(state) {
    return state.books
  }
}

export function findBook(state, id) {
  return find(state.books, book => book.id === parseInt(id, 10))
}

export function hasBook(state, id) {
  return find(state, id) !== undefined
}
