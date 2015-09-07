import * as api from './api'
import { books } from './reducer'
import deserializeErrors from '../common/api/deserialize-errors'
import TYPES from './types'

export const name = 'books'

export function request() {
  return {
    type: TYPES.FETCH
  }
}

export function fetchSuccess(books) {
  return {
    type: TYPES.FETCH_SUCCESS,
    books
  }
}

export function fetchErrors(errors) {
  return {
    type: TYPES.FETCH_ERRORS,
    errors
  }
}

export function fetch() {
  return async (dispatch) => {
    try {
      const { fetch, deserialize } = api.books
      dispatch(request())
      const res = await fetch()
      dispatch(fetchSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(fetchErrors(deserializeErrors(resOrError)))
    }
  }
}
