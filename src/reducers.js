const redux = require('redux');
const constants = require('./constants');
const actions = require('./actions');

const { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } = actions;
const { TETROMINOS } = constants;

const initializeState = {
  shape: TETROMINOS.O[0],
  // TODO
  // shape: getRandomShape();
  x: 0,
  y: 0,
};

function grid(state = initializeGridState(), action) {
  switch(action) {
    default:
      return state;
  }
}

function currentTetromino(state = initializeState, action) {
  initializeGridState
  switch(action.type) {
    case MOVE_LEFT:
      return Object.assign({}, state, { x: state.x - 1 });
    case MOVE_RIGHT:
      return Object.assign({}, state, { x: state.x + 1 });
    case MOVE_DOWN:
      return Object.assign({}, state, { y: state.y + 1 });
    // case NEW_SHAPE:
    //   return Object.assign({}, initializeState, { shape: getRandomShape() });
    default:
      return state;
  }
}

function initializeGridState() {
  result = [];
  for (let i = 0; i < 20; i++) {
    result.push(new Array(10).fill(false));
  }
  return result;
};

module.exports = redux.combineReducers({
  grid,
  currentTetromino,
});
