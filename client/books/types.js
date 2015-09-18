import actionTypes from '../common/util/action-types'

// TODO: perhaps centralize the reducer name here
export default actionTypes('books',
  'CREATE_BOOK_CHANGE',
  'CREATE',
  'CREATE_SUCCESS',
  'CREATE_ERROR',

  'DESTROY',
  'DESTROY_SUCCESS',
  'DESTROY_ERROR',

  'FETCH',
  'FETCH_SUCCESS',
  'FETCH_ERROR',

  'UPDATE_TRANSITION',
  'UPDATE_BOOK_CHANGE',
  'UPDATE_REQUEST',
  'UPDATE_SUCCESS',
  'UPDATE_ERROR',
  'UPDATE_COMPLETE'
)
