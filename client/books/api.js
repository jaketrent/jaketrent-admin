import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

function formatUrl() {
  return `${config.at('apiHost')}/api/v1/books`
}

function formatUrlSingleBook(id) {
  return `${config.at('apiHost')}/api/v1/books/${id}`
}

function serialize(book) {
  return {
    data: book
  }
}

function deserialize(res) {
  return res.data.data
}

function deserializeSingleBook(res) {
  return res.data.data[0]
}

function request(url) {
  return axios({
    method: 'get',
    url,
    withCredentials: true
  })
}

export const fetchBook = {
  formatUrl: formatUrlSingleBook,
  deserialize,
  request
}

export const fetchBooks = {
  formatUrl,
  deserialize,
  request
}

export const createBook = {
  serialize,
  deserialize: deserializeSingleBook,
  request(book) {
    return axios({
      method: 'post',
      url: formatUrl(),
      withCredentials: true,
      data: book
    })
  }
}

export const updateBook = {
  formatUrl: formatUrlSingleBook,
  serialize,
  deserialize: deserializeSingleBook,
  request(url, book) {
    return axios({
      method: 'put',
      url,
      withCredentials: true,
      data: book
    })
  }
}

export const destroyBook = {
  formatUrl: formatUrlSingleBook,
  request(url) {
    return axios({
      method: 'delete',
      url,
      withCredentials: true
    })
  }
}