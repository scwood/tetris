import gameInfo from './gameInfo'
import grid from './grid'
import logger from 'redux-logger'
import tetromino from './tetromino'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const reducer = combineReducers({
  grid,
  tetromino,
  gameInfo
})

export default function configureStore () {
  return createStore(
    reducer,
    // applyMiddleware(thunk, logger)
    applyMiddleware(thunk)
  )
}
