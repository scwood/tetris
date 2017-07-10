import gameInfo from './models/gameInfo'
import grid from './models/grid'
import score from './models/score'
import tetromino from './models/tetromino'
import level from './models/level'
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
    applyMiddleware(thunk)
  )
}
