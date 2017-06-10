import { combineReducers } from 'redux'
import { TETROMINOS, BOARD } from './constants'
import { getRandomInt } from './utils'
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  TURN_GRID_PIECE_ON,
  ADD_NEW_TETROMINO
} from './actions'

function grid (state = initializeGrid(), action) {
  switch (action.type) {
    case TURN_GRID_PIECE_ON:
      const { x, y } = action
      const newGrid = cloneGrid(state)
      newGrid[y][x] = true
      return newGrid
    default:
      return state
  }
}

function tetromino (state = initializeTetromino(), action) {
  switch (action.type) {
    case MOVE_LEFT:
      return Object.assign({}, state, { x: state.x - 1 })
    case MOVE_RIGHT:
      return Object.assign({}, state, { x: state.x + 1 })
    case MOVE_DOWN:
      return Object.assign({}, state, { y: state.y + 1 })
    case ADD_NEW_TETROMINO:
      return initializeTetromino()
    default:
      return state
  }
}

function initializeGrid () {
  let result = []
  for (let i = 0; i < 20; i++) {
    result.push(new Array(10).fill(false))
  }
  return result
};

function initializeTetromino () {
  const randomShape = getRandomInt(0, TETROMINOS.length)
  const randomRotation = getRandomInt(0, 4)
  const randomTetromino = TETROMINOS[randomShape][randomRotation]
  return {
    shape: randomTetromino,
    x: (BOARD.WIDTH / 2) - 1,
    y: 0
  }
}

function cloneGrid (grid) {
  return grid.map(row => {
    return row.slice()
  })
}

export default combineReducers({
  grid,
  tetromino
})
