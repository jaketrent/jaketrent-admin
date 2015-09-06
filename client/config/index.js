import assign from 'lodash/object/assign'

import app from './app'
import server from './server'

const allConfig = assign({}, app, server)

export function at(key) {
  if (!key) return

  return allConfig[key]
}
