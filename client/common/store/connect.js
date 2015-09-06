import { createConnector } from 'redux-react-connector'

import store from '../store'

const connect = createConnector(store)

export default (...stores) => {
  const combinedSelector = function(state) {
    return stores.reduce((allSlices, store) => {
      const slice = store.select(state)

      return {
        ...allSlices,
        [store.name]: slice
      }
    }, {})
  }

  return connect(combinedSelector)
}
