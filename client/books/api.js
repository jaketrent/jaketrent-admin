import axios from 'axios'

import actions from './actions'
import * as config from '../config'

function deserializeBooks(resBody) {
  return resBody.data
}

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
