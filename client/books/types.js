import actionTypes from '../common/util/action-types'

// TODO: perhaps centralize the reducer name here
export default actionTypes('books',
  'CREATE',
  'CREATE_SUCCESS',
  'CREATE_ERROR',

  'FETCH',
  'FETCH_SUCCESS',
  'FETCH_ERROR',

  'UPDATE_NEW_BOOK'
)
