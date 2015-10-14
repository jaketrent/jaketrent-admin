import actionTypes from '../common/util/action-types'

// TODO: perhaps centralize the reducer name here
export default actionTypes('books',
  'CREATE_TRANSITION',
  'CREATE_BOOK_CHANGE',
  'CREATE_REQUEST',
  'CREATE_SUCCESS',
  'CREATE_ERROR',
  'CREATE_COMPLETE',

  'DESTROY',
  'DESTROY_SUCCESS',
  'DESTROY_ERROR',

  'FETCH',
  'FETCH_SUCCESS',
  'FETCH_ERROR',

  'SEARCH_CHANGE',

  'UPDATE_TRANSITION',
  'UPDATE_BOOK_CHANGE',
  'UPDATE_REQUEST',
  'UPDATE_SUCCESS',
  'UPDATE_ERROR',
  'UPDATE_COMPLETE'
)
