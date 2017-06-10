const { BOARD } = require('./constants')
const { forEachBlock, everyBlock, someBlock } = require('./utils')

const TURN_GRID_PIECE_ON = 'TURN_GRID_PIECE_ON'
const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'
const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'

function attemptToMoveDown () {
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (!isValidPlacement({ shape, x, y: y + 1 })) {
      return
    }
    dispatch({ type: MOVE_DOWN })
    const newTetromino = getState().currentTetromino
    if (!hasHitBottom(newTetromino)) {
      return
    }
    forEachBlock(newTetromino, (x, y) => {
      dispatch({ type: TURN_GRID_PIECE_ON, x, y })
    })
    dispatch({ type: ADD_NEW_TETROMINO })
  }
}

function attemptToMoveRight () {
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (isValidPlacement({ shape, x: x + 1, y })) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

function attemptToMoveLeft () {
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (isValidPlacement({ shape, x: x - 1, y })) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

function isValidPlacement (tetromino) {
  return everyBlock(tetromino, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      return false
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      return false
    }
    return true
  })
}

function hasHitBottom (tetromino) {
  return someBlock(tetromino, (x, y) => {
    if (y === BOARD.HEIGHT - 1) {
      return true
    }
  })
}

module.exports = {
  ADD_NEW_TETROMINO,
  TURN_GRID_PIECE_ON,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  attemptToMoveLeft,
  attemptToMoveRight,
  attemptToMoveDown
}
