import { BOARD } from './constants'
import { forEachBlock, everyBlock, someBlock } from './utils'

export const ROTATE = 'ROTATE'
export const TURN_GRID_PIECE_ON = 'TURN_GRID_PIECE_ON'
export const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_LEFT = 'MOVE_LEFT'
export const MOVE_RIGHT = 'MOVE_RIGHT'

export function attemptToMoveDown () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (!isValidPlacement({...tetromino, y: tetromino.y + 1}, grid)) {
      return
    }
    dispatch({ type: MOVE_DOWN })
    const newTetromino = getState().tetromino
    if (!hasHitBottom(newTetromino, grid)) {
      return
    }
    forEachBlock(newTetromino, (x, y) => {
      dispatch({ type: TURN_GRID_PIECE_ON, x, y })
    })
    dispatch({ type: ADD_NEW_TETROMINO })
  }
}

export function attemptToMoveRight () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x + 1 }, grid)) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

export function attemptToMoveLeft () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x - 1 }, grid)) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

function isValidPlacement (tetromino, grid) {
  return everyBlock(tetromino, (x, y) => {
    if (grid[y][x]) {
      return false
    }
    if (x < 0 || x > BOARD.WIDTH - 1) {
      return false
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      return false
    }
    return true
  })
}

function hasHitBottom (tetromino, grid) {
  return someBlock(tetromino, (x, y) => {
    if (y === BOARD.HEIGHT - 1) {
      return true
    }
    if (grid[y + 1][x]) {
      return true
    }
  })
}
