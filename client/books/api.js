import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

export const books = {
  deserialize(res) {
    return res.data.data
  },
  fetch(id) {
    let url = `${config.at('apiHost')}/api/v1/books`
    if (!!id)
      url += `/${id}`
    return axios({
      method: 'get',
      url,
      withCredentials: true
    })
  },
  create(book) {
    function serialize(b) {
      return {
        data: b
      }
    }

    return axios({
      method: 'post',
      url: `${config.at('apiHost')}/api/v1/books`,
      withCredentials: true,
      data: serialize(book)
    })
  }
}