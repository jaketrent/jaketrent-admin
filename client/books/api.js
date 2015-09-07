import axios from 'axios'

import * as actions from './actions'
import * as config from '../config'

function deserializeBooks(resBody) {
  return resBody.data
}

// TODO: redo impl like auth

export async function fetch() {
  let url = `${config.at('apiHost')}/books`
  try {
    let res = await axios({
      method: 'get',
      url,
      withCredentials: true
    })
    actions.fetchSuccess(deserializeBooks(res.data))
  } catch (resOrError) {
    throw resOrError // TODO: handle
  }
}
