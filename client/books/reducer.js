import clone from 'lodash/lang/clone'
import find from 'lodash/collection/find'
import uniq from 'lodash/array/uniq'

import TYPES from './types'

export const initialState = {
  newBook: {},
  newBookErrors: [],
  books: []
}

function destroySuccess(state, action) {
  const books = clone(state.books)
  books.splice(indexOfBook(state, action.id), 1)
  return {
    ...state,
    books
  }
}

function createSuccess(state, action) {
  return {
    ...state,
    newBook: action.book,
    newBooksErrors: [],
    books: [action.book].concat(state.books)
  }
}

function createError(state, action) {
  return {
    ...state,
    newBookErrors: action.errors
  }
}

function fetchSuccess(state, action) {
  return {
    ...state,
    books: uniq(state.books.concat(action.books), b => b.id),
    newBookErrors: []
  }
}

// TODO: impl a set or startNewBook

function updateNewBook(state, action) {
  return {
    ...state,
    newBook: {
      ...state.newBook,
      [action.fieldName]: action.value
    }
  }
}

export default function(state = initialState, action = {}) {
  // TODO: use 'handle*' name
  const handlers = {
    [TYPES.DESTROY_SUCCESS]: destroySuccess,
    [TYPES.CREATE_SUCCESS]: createSuccess,
    [TYPES.CREATE_ERROR]: createError,
    [TYPES.FETCH_SUCCESS]: fetchSuccess,
    [TYPES.UPDATE_NEW_BOOK]: updateNewBook
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

function indexOfBook(state, id) {
  return state.books.map(book => book.id).indexOf(id)
}

export function findBook(state, id) {
  return find(state.books, book => book.id === parseInt(id, 10))
}

export function hasBook(state, id) {
  return find(state, id) !== undefined
}
