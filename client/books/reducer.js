import clone from 'lodash/lang/clone'
import find from 'lodash/collection/find'
import uniq from 'lodash/array/uniq'

import TYPES from './types'

export const initialState = {
  newBook: {},
  newBookErrors: [],
  createIsRequesting: false,
  createIsSuccess: false,
  createIsComplete: false,

  updateBook: null,
  updateBookErrors: [],
  updateIsRequesting: false,
  updateIsSuccess: false,
  updateIsComplete: false,

  books: [],
  paging: null,

  searchTerm: ''
}

function destroySuccess(state, action) {
  const books = clone(state.books)
  books.splice(indexOfBook(state, action.id), 1)
  return {
    ...state,
    books
  }
}

function createTransition(state, action) {
  return {
    ...state,
    newBook: {},
    newBookErrors: [],
    createIsSuccess: false,
    createIsComplete: false
  }
}

function createBookChange(state, action) {
  return {
    ...state,
    newBook: {
        ...state.newBook,
      [action.fieldName]: action.value
    }
  }
}

function createRequest(state, action) {
  return {
    ...state,
    createIsRequesting: true,
    createIsComplete: false
  }
}


function createSuccess(state, action) {
  return {
    ...state,
    newBook: action.book,
    newBooksErrors: [],
    books: [action.book].concat(state.books),
    createIsSuccess: true
  }
}

function createError(state, action) {
  return {
    ...state,
    newBookErrors: action.errors
  }
}

function createComplete(state, action) {
  return {
    ...state,
    createIsRequesting: false,
    createIsComplete: true
  }
}


function updateTransition(state, action) {
  return {
    ...state,
    updateBook: action.book,
    updateIsSuccess: false,
    updateIsComplete: false
  }
}

function updateRequest(state, action) {
  return {
    ...state,
    updateIsRequesting: true,
    updateIsComplete: false
  }
}

function updateSuccess(state, action) {
  const books = clone(state.books)
  books[indexOfBook(state, action.book.id)] = action.book
  return {
    ...state,
    updateBook: action.book,
    updateBooksErrors: [],
    books,
    updateIsSuccess: true
  }
}

function updateError(state, action) {
  return {
    ...state,
    updateBookErrors: action.errors
  }
}

function updateComplete(state, action) {
  return {
    ...state,
    updateIsRequesting: false,
    updateIsComplete: true
  }
}

function updateBookChange(state, action) {
  return {
    ...state,
    updateBook: {
      ...state.updateBook,
      [action.fieldName]: action.value
    }
  }
}

function fetchSuccess(state, action) {
  return {
    ...state,
    books: uniq(state.books.concat(action.books), b => b.id),
    paging: action.paging
  }
}

function searchChange(state, action) {
  return {
    ...state,
    searchTerm: action.term
  }
}

export default function(state = initialState, action = {}) {
  const handlers = {
    [TYPES.DESTROY_SUCCESS]: destroySuccess,
    [TYPES.CREATE_TRANSITION]: createTransition,
    [TYPES.CREATE_BOOK_CHANGE]: createBookChange,
    [TYPES.CREATE_REQUEST]: createRequest,
    [TYPES.CREATE_SUCCESS]: createSuccess,
    [TYPES.CREATE_ERROR]: createError,
    [TYPES.CREATE_COMPLETE]: createComplete,
    [TYPES.UPDATE_TRANSITION]: updateTransition,
    [TYPES.UPDATE_BOOK_CHANGE]: updateBookChange,
    [TYPES.UPDATE_REQUEST]: updateRequest,
    [TYPES.UPDATE_SUCCESS]: updateSuccess,
    [TYPES.UPDATE_ERROR]: updateError,
    [TYPES.UPDATE_COMPLETE]: updateComplete,
    [TYPES.FETCH_SUCCESS]: fetchSuccess,
    [TYPES.SEARCH_CHANGE]: searchChange
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}

// TODO: think about where besides reducer.js that these functions might belong

// TODO: refactor these to top-level on the reducer (match the actions, easier to extend, connect verbage is right), can import the reducer itself in the components
export const books = {
  name: 'books',
  select(state) {
    return state.books
  }
}

function indexOfBook(state, id) {
  return state.books.map(book => book.id).indexOf(id)
}

function hasFilter(state) {
  return state.searchTerm.length > 0
}

export function findBook(state, id) {
  return find(state.books, book => book.id === parseInt(id, 10))
}

export function hasBook(state, id) {
  return findBook(state, id) !== undefined
}

export function hasBooks(state) {
  return (state.books || []).length > 0
}

export function hasNextPage(state) {
  return !!state.paging && !!state.paging.next && !!state.paging.next.url
}

export function getNextPage(state) {
  return hasNextPage(state) ? state.paging.next.url : null
}

export function filter(state) {
  if (!hasFilter(state)) return state.books

  const regex = new RegExp(state.searchTerm.toLowerCase())
  return state.books.filter(book => {
    return regex.test(book.title.toLowerCase()) ||
           regex.test(book.author.toLowerCase()) ||
           regex.test(book.description.toLowerCase())

  })
}
