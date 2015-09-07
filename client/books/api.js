import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

export const books = {
  deserialize(res) {
    return res.data.data
  },
  fetch() {
    return axios({
      method: 'get',
      url: `${config.at('apiHost')}/api/v1/books`,
      withCredentials: true
    })
  }
}