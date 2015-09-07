import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import uniq from 'lodash/array/uniq'

import { dispatch, default as store } from '../store'

// TODO: these aren't reducers per se;  come up with better name for this { name, select } object
function toReducers(reducers) {
  return function mapStateToProps(state) {
    return reducers.reduce((combinedProps, reducer) => {
      if (!reducer.name)
        throw new Error('`name` (String) export required for every connected reducer', reducer)

      if (!reducer.select)
        throw new Error('`select` (Function) export required for every connected reducer', reducer)

      return {
        ...combinedProps,
        [reducer.name]: reducer.select(state)
      }
    }, {})
  }
}

function toActions(actions) {
  return function mapDispatchToProps() {
    return actions.reduce((combinedActionCreators, actions) => {
      const { name, ...actionFns } = actions
      if (!name)
        throw new Error('`name` (String) export required for every connected action', boundActions)

      return {
        ...combinedActionCreators,
        [name]: bindActionCreators(actionFns, dispatch)
      }
    }, {})
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  // TODO: test for clobbering names
  const combinedStateAndActions = Object.keys(dispatchProps).reduce((acc, key) => {
    acc[key] = {
      ...acc[key],
      ...dispatchProps[key]
    }
    return acc
  }, stateProps)

  return {
    ...ownProps,
    ...combinedStateAndActions
  }
}

export default function connectTo(reducers, actions) {
  return connect(toReducers(reducers), toActions(actions), mergeProps)
}