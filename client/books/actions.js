import * as api from './api'
import { books, hasBooks, hasBook } from './reducer'
import deserializeErrors from '../common/api/deserialize-errors'
import TYPES from './types'

export const name = 'books'

function fetchRequest(id) {
  return {
    type: TYPES.FETCH,
    id
  }
}

function fetchSuccess(books) {
  return {
    type: TYPES.FETCH_SUCCESS,
    books
  }
}

function fetchError(errors) {
  return {
    type: TYPES.FETCH_ERROR,
    errors
  }
}

async function doFetch(dispatch, apiEndpoint, url) {
  try {
    const { request, deserialize } = apiEndpoint
    dispatch(fetchRequest())
    const res = await request(url)
    dispatch(fetchSuccess(deserialize(res)))
  } catch (resOrError) {
    if (resOrError instanceof Error) throw resOrError
    dispatch(fetchError(deserializeErrors(resOrError)))
  }
}

export function fetchById(id) {
  return async (dispatch, getState) => {
    const state = books.select(getState())
    const { formatUrl, ...apiEndpoint } = api.fetchBook

    if (!hasBook(state, id))
      doFetch(dispatch, apiEndpoint, formatUrl(id))
  }
}

export function fetch() {
  return async (dispatch, getState) => {
    const state = books.select(getState())
    const { formatUrl, ...apiEndpoint } = api.fetchBooks

    if (!hasBooks(state))
      doFetch(dispatch, apiEndpoint, formatUrl())
  }
}

export function createBookChange(fieldName, value) {
  return {
    type: TYPES.UPDATE_NEW_BOOK,
    fieldName,
    value
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

function destroyRequest() {
  return {
    type: TYPES.DESTROY
  }
}

function destroySuccess(id) {
  return {
    type: TYPES.DESTROY_SUCCESS,
    id
  }
}

function destroyError(errors) {
  return {
    type: TYPES.DESTROY_ERROR,
    errors
  }
}

export function destroy(id) {
  return async (dispatch) => {
    try {
      const { formatUrl, request } = api.destroyBook
      dispatch(destroyRequest())
      const res = await request(formatUrl(id))
      dispatch(destroySuccess(id))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(destroyError(deserializeErrors(resOrError)))
    }
  }
}

export function updateTransition(book) {
  return {
    type: TYPES.UPDATE_TRANSITION,
    book
  }
}

export function updateBookChange(fieldName, value) {
  return {
    type: TYPES.UPDATE_BOOK_CHANGE,
    fieldName,
    value
  }
}

function updateRequest() {
  return {
    type: TYPES.UPDATE_REQUEST
  }
}

function updateSuccess(book) {
  return {
    type: TYPES.UPDATE_SUCCESS,
    book
  }
}

function updateError(errors) {
  return {
    type: TYPES.UPDATE_ERROR,
    errors
  }
}

function updateComplete() {
  return {
    type: TYPES.UPDATE_COMPLETE
  }
}

export function update(book) {
  return async (dispatch) => {
    try {
      const { formatUrl, request, serialize, deserialize } = api.updateBook
      dispatch(updateRequest())
      const res = await request(formatUrl(book.id), serialize(book))
      dispatch(updateSuccess(deserialize(res)))
    } catch (resOrError) {
      if (resOrError instanceof Error) throw resOrError
      dispatch(updateError(deserializeErrors(resOrError)))
    } finally {
      dispatch(updateComplete())
    }
  }
}
