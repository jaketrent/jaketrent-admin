import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

export const fetchBooks = {
  deserialize(res) {
    return res.data.data
  },
  request(id) {
    let url = `${config.at('apiHost')}/api/v1/books`
    if (!!id)
      url += `/${id}`
    return axios({
      method: 'get',
      url,
      withCredentials: true
    })
  }
}

export const createBook = {
  serialize(book) {
    return {
      data: book
    }
  },
  deserialize(res) {
    return res.data.data[0]
  },
  request(book) {
    return axios({
      method: 'post',
      url: `${config.at('apiHost')}/api/v1/books`,
      withCredentials: true,
      data: book
    })
  }
}

export const destroyBook = {
  request(bookId) {
    return axios({
      method: 'delete',
      url: `${config.at('apiHost')}/api/v1/books/${bookId}`,
      withCredentials: true
    })
  }
}