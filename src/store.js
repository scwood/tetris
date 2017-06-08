const reducer = require('./reducers')

function createStore (reducer) {
  let state
  let listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

function addLoggingToDispatch (store) {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }

  return (action) => {
    console.group(action.type)
    console.log('%c prev state', 'color: grey', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

function configureStore () {
  const store = createStore(reducer)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  return store
}

module.exports = configureStore()
