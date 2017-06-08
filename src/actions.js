const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'

function moveLeft () {
  return { type: MOVE_LEFT }
}

function moveRight () {
  return { type: MOVE_RIGHT }
}

function moveDown () {
  return { type: MOVE_DOWN }
}

module.exports = {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  moveLeft,
  moveRight,
  moveDown
}
