const store = require('./store')
const constants = require('./constants')
const actions = require('./actions')

const { moveLeft, moveRight, moveDown } = actions
const { dispatch } = store
const { BOARD, SQUARE, COLORS, KEY } = constants
const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

canvas.height = BOARD.HEIGHT * SQUARE.WIDTH
canvas.width = BOARD.WIDTH * SQUARE.WIDTH

store.subscribe(() => {
  drawGame(store.getState())
})

drawGame(store.getState())

document.addEventListener('keydown', handleKeydown)

function handleKeydown (e) {
  const state = store.getState()

  const { shape, x, y } = state.currentTetromino;
  switch(e.keyCode) {
    case KEY.LEFT:
      if (isValidPlacement(shape, x - 1, y)) {
        dispatch(moveLeft());
      }
      break
    case KEY.RIGHT:
      dispatch(moveRight())
      break
    case KEY.DOWN:
      dispatch(moveDown())
      break
  }
}

function drawGame (state) {
  drawGrid(state)
  drawCurrentTetrimino(state)
}

function drawGrid (state) {
  state.grid.forEach((row, y) => {
    row.forEach((filled, x) => {
      drawGridSquare(x, y, filled)
    })
  })
}

function drawCurrentTetrimino (state) {
  const { currentTetromino: { shape, x, y } } = state
  drawTetromino(shape, x, y)
}

function drawTetromino(shape, x, y) {
  eachBlock(shape, x, y, (x, y) => {
    drawGridSquare(x, y, true)
  });
}

function isValidPlacement(shape, x, y) {
  let valid = true;
  eachBlock(shape, x, y, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      valid = false;
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      valid = false;
    }
  });
  return valid;
}

function eachBlock(shape, x, y, fn) {
  let row = 0;
  let col = 0;
  for (let bit = 0x8000; bit > 0; bit = bit >> 1) {
    if (shape & bit) {
      fn(x + col, y + row);
    }
    if (++col === 4) {
      col = 0
      ++row
    }
  }
}

function drawGridSquare (x, y, filled) {
  const color = filled ? COLORS.BLACK : COLORS.GREY
  drawSquare(x * SQUARE.WIDTH, y * SQUARE.WIDTH, SQUARE.WIDTH, color)
}

function drawSquare (x, y, width, color) {
  ctx.beginPath()
  ctx.rect(x, y, width, width)
  ctx.fillStyle = color
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
