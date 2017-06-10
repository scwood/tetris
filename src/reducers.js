import { combineReducers } from 'redux'
import { TETROMINOS, BOARD } from './constants'
import { getRandomInt } from './utils'
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  TURN_GRID_PIECE_ON,
  ADD_NEW_TETROMINO,
  ROTATE
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
      return {...state, x: state.x - 1 }
    case MOVE_RIGHT:
      return {...state, x: state.x + 1 }
    case MOVE_DOWN:
      return {...state, y: state.y + 1 }
    case ADD_NEW_TETROMINO:
      return initializeTetromino()
    case ROTATE:
      return {...state, rotation: action.rotation }
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
  const tetrominoNames = Object.keys(TETROMINOS)
  const index = getRandomInt(0, tetrominoNames.length - 1)
  const newTetrominoName = tetrominoNames[index]
  const newTetromino = TETROMINOS[newTetrominoName]
  const rotation = newTetromino.rotations[0]
  return {
    name: newTetrominoName,
    x: (BOARD.WIDTH / 2) - 2,
    y: 0,
    rotation
  }
}

function cloneGrid (grid) {
  return grid.map(row => row.slice()) 
}

export default combineReducers({
  grid,
  tetromino
})
