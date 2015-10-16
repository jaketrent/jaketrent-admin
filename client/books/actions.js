import * as api from './api'
import { books, hasBooks, hasBook, getNextPage, hasNextPage } from './reducer'
import TYPES from './types'

export const name = 'books'

function fetchRequest(id) {
  return {
    type: TYPES.FETCH,
    id
  }
}

function fetchSuccess(deserialized) {
  return {
    type: TYPES.FETCH_SUCCESS,
    ...deserialized
  }
}

function fetchError(errors) {
  return {
    type: TYPES.FETCH_ERROR,
    errors
  }
}

async function doFetch(dispatch, apiEndpoint, url) {
  const { request, deserializeSuccess, deserializeError } = apiEndpoint
  try {
    dispatch(fetchRequest())
    const res = await request(url)
    dispatch(fetchSuccess(deserializeSuccess(res)))
  } catch (resOrError) {
    if (resOrError instanceof Error) throw resOrError
    dispatch(fetchError(deserializeError(resOrError)))
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

export function fetchMore() {
  return async (dispatch, getState) => {
    const state = books.select(getState())

    if (hasNextPage(state))
      doFetch(dispatch, api.fetchBooks, getNextPage(state))
  }
}

export function createTransition() {
  return {
    type: TYPES.CREATE_TRANSITION
  }
}

export function createBookChange(fieldName, value) {
  return {
    type: TYPES.CREATE_BOOK_CHANGE,
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

function createSuccess(deserialized) {
  return {
    type: TYPES.CREATE_SUCCESS,
    ...deserialized
  }
}

function createError(errors) {
  return {
    type: TYPES.CREATE_ERROR,
    errors
  }
}

function createComplete() {
  return {
    type: TYPES.CREATE_COMPLETE
  }
}


export function create(book) {
  return async (dispatch) => {
    const { request, serialize, deserializeSuccess, deserializeError } = api.createBook
    try {
      console.log("deserializeError", deserializeError)
      dispatch(createRequest(book))
      const res = await request(serialize(book))
      dispatch(createSuccess(deserializeSuccess(res)))
    } catch (res) {
      if (res instanceof Error) throw res
      dispatch(createError(deserializeError(res)))
    } finally {
      dispatch(createComplete())
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
    const { formatUrl, request, deserializeError } = api.destroyBook
    try {
      dispatch(destroyRequest())
      const res = await request(formatUrl(id))
      dispatch(destroySuccess(id))
    } catch (res) {
      if (res instanceof Error) throw res
      dispatch(destroyError(deserializeError(res)))
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

function updateSuccess(deserialized) {
  return {
    type: TYPES.UPDATE_SUCCESS,
    ...deserialized
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
    const { formatUrl, request, serialize, deserializeError, deserializeSuccess } = api.updateBook
    try {
      dispatch(updateRequest())
      const res = await request(formatUrl(book.id), serialize(book))
      dispatch(updateSuccess(deserializeSuccess(res)))
    } catch (res) {
      if (res instanceof Error) throw res
      dispatch(updateError(deserializeError(res)))
    } finally {
      dispatch(updateComplete())
    }
  }
}

export function searchChange(term) {
  return {
    type: TYPES.SEARCH_CHANGE,
    term
  }
}
