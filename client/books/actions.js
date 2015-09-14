import * as api from './api'
import { books } from './reducer'
import deserializeErrors from '../common/api/deserialize-errors'
import TYPES from './types'

export const name = 'books'

export function fetchRequest(id) {
  return {
    type: TYPES.FETCH,
    id
  }
}

export function fetchSuccess(books) {
  return {
    type: TYPES.FETCH_SUCCESS,
    books
  }
}

export function fetchError(errors) {
  return {
    type: TYPES.FETCH_ERROR,
    errors
  }
}

export function fetch(id) {
  return async (dispatch) => {
    try {
      const { request, deserialize } = api.fetchBooks
      dispatch(fetchRequest(id))
      const res = await request(id)
      dispatch(fetchSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(fetchError(deserializeErrors(resOrError)))
    }
  }
}

function createRequest(book) {
  return {
    type: TYPES.CREATE,
    book
  }
}

function createSuccess(book) {
  return {
    type: TYPES.CREATE_SUCCESS,
    book
  }
}

function createError(errors) {
  return {
    type: TYPES.CREATE_ERROR,
    errors
  }
}

export function create(book) {
  return async (dispatch) => {
    try {
      const { request, serialize, deserialize } = api.createBook
      dispatch(createRequest(book))
      const res = await request(serialize(book))
      dispatch(createSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(createError(deserializeErrors(resOrError)))
    }
  }
}

export function destroyRequest(id) {
  return {
    type: TYPES.DESTROY,
    id
  }
}

export function destroySuccess(id) {
  return {
    type: TYPES.DESTROY_SUCCESS,
    id
  }
}

export function destroyError(errors) {
  return {
    type: TYPES.DESTROY_ERROR,
    errors
  }
}

export function destroy(id) {
  return async (dispatch) => {
    try {
      const { request } = api.destroyBook
      dispatch(destroyRequest(id))
      const res = await request(id)
      dispatch(destroySuccess(id))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(destroyError(deserializeErrors(resOrError)))
    }
  }
}

export function updateNewBook(fieldName, value) {
  return {
    type: TYPES.UPDATE_NEW_BOOK,
    fieldName,
    value
  }
}