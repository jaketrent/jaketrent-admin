import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'

import * as reducers from './reducers'

const combinedReducers = combineReducers(reducers)
const finalCreateStore = applyMiddleware(reduxThunk)(createStore)

export default finalCreateStore(combinedReducers)
