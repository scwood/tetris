import gameInfo from './gameInfo'
import grid from './grid'
import level from './level'
import score from './score'
import tetromino from './tetromino'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  gameInfo,
  grid,
  score,
  tetromino,
  level
})

export function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
}
