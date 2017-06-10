import { combineReducers } from 'redux'
import { TETROMINOS, BOARD } from './constants'
import { getRandomInt, clone2DArray } from './utils'
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  SET_GRID_COLOR,
  ADD_NEW_TETROMINO,
  ROTATE,
  CLEAR_ROWS
} from './actions'

function grid (state = initializeGrid(), action) {
  let newGrid
  switch (action.type) {
    case SET_GRID_COLOR:
      const { x, y, color } = action
      newGrid = clone2DArray(state)
      newGrid[y][x] = color
      return newGrid
    case CLEAR_ROWS:
      const { rowsToClear } = action
      newGrid = clone2DArray(state).filter((row, i) => {
        return rowsToClear.indexOf(i) === -1
      })
      return rowsToClear.map(() => {
        return initializeGridRow()
      }).concat(newGrid)
    default:
      return state
  }
}

function tetromino (state = initializeTetromino(), action) {
  switch (action.type) {
    case MOVE_LEFT:
      return { ...state, x: state.x - 1 }
    case MOVE_RIGHT:
      return { ...state, x: state.x + 1 }
    case MOVE_DOWN:
      return { ...state, y: state.y + 1 }
    case ADD_NEW_TETROMINO:
      return initializeTetromino()
    case ROTATE:
      return { ...state, rotation: action.rotation }
    default:
      return state
  }
}

function initializeGrid () {
  let result = []
  for (let i = 0; i < 20; i++) {
    result.push(initializeGridRow())
  }
  return result
}

function initializeGridRow () {
  return new Array(10).fill(false)
}

function initializeTetromino () {
  const tetrominoNames = Object.keys(TETROMINOS)
  const index = getRandomInt(0, tetrominoNames.length - 1)
  const newTetrominoName = tetrominoNames[index]
  const { rotations, color } = TETROMINOS[newTetrominoName]
  const rotation = rotations[0]
  return {
    name: newTetrominoName,
    x: (BOARD.WIDTH / 2) - 2,
    y: -1,
    color,
    rotation
  }
}

export default combineReducers({
  grid,
  tetromino
})
