import gameInfo from './gameInfo'
import grid from './grid'
import score from './score'
import tetromino from './tetromino'
import level from './level'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  gameInfo,
  grid,
  score,
  tetromino,
  level
})

export default function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(thunk/*, logger */)
  )
}
