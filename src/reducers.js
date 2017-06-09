const { combineReducers } = require('redux')
const { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } = require('./actions')
const { TETROMINOS } = require('./constants')

function grid (state = initializeGridState(), action) {
  switch (action) {
    default:
      return state
  }
}

function currentTetromino (state = {
  shape: TETROMINOS.O[0],
  x: 0,
  y: 0
}, action) {
  switch (action.type) {
    case MOVE_LEFT:
      return Object.assign({}, state, { x: state.x - 1 })
    case MOVE_RIGHT:
      return Object.assign({}, state, { x: state.x + 1 })
    case MOVE_DOWN:
      return Object.assign({}, state, { y: state.y + 1 })
    default:
      return state
  }
}

function initializeGridState () {
  let result = []
  for (let i = 0; i < 20; i++) {
    result.push(new Array(10).fill(false))
  }
  return result
};

module.exports = combineReducers({
  grid,
  currentTetromino
})
