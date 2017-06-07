const store = require('./store');
const constants = require('./constants');
const actions = require('./actions');

const { moveLeft, moveUp, moveRight, moveDown } = actions;
const { dispatch } = store;
const { BOARD, SQUARE, COLORS, KEY } = constants;
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.height = BOARD.HEIGHT * SQUARE.WIDTH;
canvas.width = BOARD.WIDTH * SQUARE.WIDTH;

store.subscribe(() => {
  drawGame(store.getState());
});

drawGame(store.getState());

document.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  switch(e.keyCode) {
    case KEY.LEFT:
      dispatch(moveLeft());
      break;
    case KEY.UP:
      break;
    case KEY.RIGHT:
      dispatch(moveRight());
      break;
    case KEY.DOWN:
      dispatch(moveDown());
      break;
  }
}

function drawGame(state) {
  drawGrid(state);
  drawCurrentTetrimino(state);
}

function drawGrid(state) {
  state.grid.forEach((row, y) => {
    row.forEach((filled, x) => {
      drawGridSquare(x, y, filled);
    });
  });
}

function drawCurrentTetrimino(state) {
  const { currentTetromino: { shape, x, y } } = state;
  drawTetromino(shape, x, y);
}

function drawTetromino(shape, x, y) {
  let row = 0;
  let col = 0;
  for (let bit = 0x8000; bit > 0; bit = bit >> 1) {
    if (shape & bit) {
      drawGridSquare(x + col, y + row, true);
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
}

function drawGridSquare(x, y, filled) {
  const color = filled ? COLORS.BLACK : COLORS.GREY;
  drawSquare(x * SQUARE.WIDTH, y * SQUARE.WIDTH, SQUARE.WIDTH, color);
}

function drawSquare(x, y, width, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, width);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
