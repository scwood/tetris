import gameInfo from './gameInfo'
import grid from './grid'
import score from './score'
import tetromino from './tetromino'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  gameInfo,
  grid,
  score,
  tetromino
})

export default function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
}
