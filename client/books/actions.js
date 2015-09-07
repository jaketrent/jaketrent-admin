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

export function fetchErrors(errors) {
  return {
    type: TYPES.FETCH_ERRORS,
    errors
  }
}

export function fetch(id) {
  return async (dispatch) => {
    try {
      const { fetch, deserialize } = api.books
      dispatch(fetchRequest(id))
      const res = await fetch(id)
      dispatch(fetchSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(fetchErrors(deserializeErrors(resOrError)))
    }
  }
}

function createRequest(book) {
  return {
    type: TYPES.CREATE,
    book
  }
}

function createSuccess(books) {
  return {
    type: TYPES.CREATE_SUCCESS,
    books
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
      const { create, deserialize } = api.books
      dispatch(createRequest(book))
      const res = await create(book)
      dispatch(createSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(createError(deserializeErrors(resOrError)))
    }
  }
}

export function updateNewBook(fieldName, value) {
  console.log('updatenewbook action!')
  return {
    type: TYPES.UPDATE_NEW_BOOK,
    fieldName,
    value
  }
}