import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

import reducer from './reducers'

export default function configureStore () {
  return createStore(
    reducer,
    applyMiddleware(thunk, logger)
  )
}
