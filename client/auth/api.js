import axios from 'axios'

import * as config from '../config'

export const currentSession = {
  //serialize() {
  //
  //},
  deserialize(res) {
    return res.data.data
  },
  fetch() {
    return axios({
      method: 'get',
      url: `${config.at('apiHost')}/auth/current`,
      withCredentials: true
    })
  }
}

export const logout = {
  request() {
    return axios({
      method: 'get',
      url: `${config.at('apiHost')}/auth/logout`,
      withCredentials: true
    })
  }
}