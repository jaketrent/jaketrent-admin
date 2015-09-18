import * as actions from './actions'
import { hasBook } from './reducer'

export function initFetchBooks(dispatch) {
  return function fetchBooks(params, next) {
    dispatch(actions.fetch())
    next()
  }
}

export function initFetchBook(dispatch) {
  return function fetchBook(params, next) {
    dispatch(actions.fetchById(params.bookId))
    next()
  }
}