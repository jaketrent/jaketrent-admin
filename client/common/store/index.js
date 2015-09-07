import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

const rootReducer = combineReducers(reducers)
const createStoreWidthMiddleware = applyMiddleware(
  thunk
)(createStore)

// TODO: wrap in init() where we can set initialState for easier bootstrapping
const store = createStoreWidthMiddleware(rootReducer)

export default store
