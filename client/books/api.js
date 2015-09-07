import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

export const books = {
  deserialize(res) {
    return res.data.data
  },
  fetch(id) {
    console.log('id', id)
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