const logger = require('redux-logger').default
const thunk = require('redux-thunk').default
const reducer = require('./reducers')
const { applyMiddleware, createStore } = require('redux')

function configureStore () {
  return createStore(
    reducer,
    applyMiddleware(thunk, logger)
  )
}

module.exports = configureStore
