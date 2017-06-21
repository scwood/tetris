import { TETROMINOS } from './constants'
import { END_GAME } from './gameInfo'
import { forEachBlock } from './utils'

const SET_GRID_COLOR = 'SET_GRID_COLOR'
const CLEAR_ROWS = 'CLEAR_ROWS'

export default function grid (state = initializeGrid(), action) {
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
    case END_GAME:
      return initializeGrid()
    default:
      return state
  }
}

export function clearCompletedRows () {
  return (dispatch, getState) => {
    const { grid } = getState()
    const rowsToClear = grid.map((row, i) => i).filter(i => {
      return grid[i].every(x => x)
    })
    dispatch({ type: CLEAR_ROWS, rowsToClear })
  }
}

export function addTetrominoToGrid () {
  return (dispatch, getState) => {
    const { tetromino } = getState()
    forEachBlock(tetromino, (x, y) => {
      const color = TETROMINOS[tetromino.name].color
      dispatch({ type: SET_GRID_COLOR, x, y, color })
    })
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

export function clone2DArray (arr) {
  return arr.map(row => row.slice())
}
