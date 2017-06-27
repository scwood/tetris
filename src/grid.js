import { END_GAME } from './gameInfo'
import { TETROMINOS, POINTS } from './constants'
import { addPoints, incrementLines } from './score'
import { forEachBlock } from './utils'
import { getTetromino } from './tetromino'

const SET_GRID_COLOR = 'SET_GRID_COLOR'
const CLEAR_ROWS = 'CLEAR_ROWS'

function initializeGrid () {
  return new Array(20).fill(initializeGridRow())
}

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

export const getGrid = state => state.grid

export function clearCompletedRows () {
  return (dispatch, getState) => {
    const grid = getGrid(getState())
    const rowsToClear = []
    let consecutive = 0
    let previousIndex = -1
    grid.forEach((row, i) => {
      const cleared = grid[i].every(x => x)
      if (cleared) {
        rowsToClear.push(i)
        dispatch(incrementLines())
      }
      if (cleared && previousIndex + 1 === i) {
        consecutive += 1
      }
      if ((!cleared || i === 19) && consecutive > 0) {
        dispatch(addPoints(POINTS[consecutive]))
        consecutive = 0
      }
      previousIndex = i
    })
    dispatch({ type: CLEAR_ROWS, rowsToClear })
  }
}

export function addTetrominoToGrid () {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState())
    forEachBlock(tetromino, (x, y) => {
      const color = TETROMINOS[tetromino.name].color
      dispatch({ type: SET_GRID_COLOR, x, y, color })
    })
  }
}

function initializeGridRow () {
  return new Array(10).fill(false)
}

export function clone2DArray (arr) {
  return arr.map(row => row.slice())
}
