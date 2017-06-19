import { BOARD, TETROMINOS } from './constants'
import { forEachBlock, everyBlock, someBlock } from './utils'

export const ROTATE = 'ROTATE'
export const CLEAR_ROWS = 'CLEAR_ROWS'
export const SET_GRID_COLOR = 'SET_GRID_COLOR'
export const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_LEFT = 'MOVE_LEFT'
export const MOVE_RIGHT = 'MOVE_RIGHT'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const RESIZE_GAME = 'RESIZE_GAME'

export function moveDown () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (hasHitBottom(tetromino, grid)) {
      if (hasHitTop(tetromino)) {
        dispatch({ type: END_GAME })
        return
      }
      dispatch(addTetrominoToGrid())
      dispatch(clearCompletedRows())
      dispatch({ type: ADD_NEW_TETROMINO })
      return
    }
    if (!isValidPlacement({...tetromino, y: tetromino.y + 1}, grid)) {
      return
    }
    dispatch({ type: MOVE_DOWN })
  }
}

export function moveRight () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x + 1 }, grid)) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

export function moveLeft () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x - 1 }, grid)) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

export function rotate () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    const newRotation = getNextRotation(tetromino)
    if (isValidPlacement({ ...tetromino, rotation: newRotation }, grid)) {
      dispatch({ type: ROTATE, rotation: newRotation })
    }
  }
}

export function resizeGame () {
  const width = window.innerWidth - 20 // -20 for window padding
  const height = window.innerHeight - 20
  return { type: RESIZE_GAME, width, height }
}

export function startGame () {
  return { type: START_GAME }
}

function addTetrominoToGrid () {
  return (dispatch, getState) => {
    const { tetromino } = getState()
    forEachBlock(tetromino, (x, y) => {
      dispatch({ type: SET_GRID_COLOR, x, y, color: getColor(tetromino) })
    })
  }
}

function clearCompletedRows () {
  return (dispatch, getState) => {
    const { grid } = getState()
    const rowsToClear = grid.map((row, i) => i).filter(i => {
      return grid[i].every(x => x)
    })
    dispatch({ type: CLEAR_ROWS, rowsToClear })
  }
}

function getNextRotation (tetromino) {
  const { name, rotation } = tetromino
  const { rotations } = TETROMINOS[name]
  const oldIndex = rotations.indexOf(rotation)
  const newIndex = (oldIndex + 1) % rotations.length
  return rotations[newIndex]
}

function getColor (tetromino) {
  return TETROMINOS[tetromino.name].color
}

function isValidPlacement (tetromino, grid) {
  return everyBlock(tetromino, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      return false
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      return false
    }
    if (grid[y][x]) {
      return false
    }
    return true
  })
}

function hasHitBottom (tetromino, grid) {
  return someBlock(tetromino, (x, y) => {
    return y === BOARD.HEIGHT - 1 || grid[y + 1][x]
  })
}

function hasHitTop (tetromino) {
  return someBlock(tetromino, (x, y) => {
    return y <= 0
  })
}
