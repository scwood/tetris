const { BOARD } = require('./constants')
const { eachBlock } = require('./utils')

const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'

function attemptToMoveRight () {
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (isValidPlacement(shape, x + 1, y)) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

function attemptToMoveLeft () {
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (isValidPlacement(shape, x - 1, y)) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

function attemptToMoveDown () {
  // TODO if hit the bottom, then generate new shape, update the grid state,
  return (dispatch, getState) => {
    const { currentTetromino: { shape, x, y } } = getState()
    if (isValidPlacement(shape, x, y + 1)) {
      dispatch({ type: MOVE_DOWN })
    }
  }
}

function isValidPlacement (shape, x, y) {
  let valid = true
  eachBlock(shape, x, y, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      valid = false
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      valid = false
    }
  })
  return valid
}

module.exports = {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  attemptToMoveLeft,
  attemptToMoveRight,
  attemptToMoveDown
}
