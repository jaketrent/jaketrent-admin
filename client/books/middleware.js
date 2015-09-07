import * as actions from './actions'
import { hasBook } from './reducer'
import store from '../common/store'

export default function fetchBook(params, next) {
  if (!hasBook(store.getState().books, params.bookId))
    store.dispatch(actions.fetch(params.bookId))
  next()
}