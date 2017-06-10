import { BOARD, SQUARE, COLORS } from './constants'
import { forEachBlock } from './utils'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

canvas.height = BOARD.HEIGHT * SQUARE.WIDTH
canvas.width = BOARD.WIDTH * SQUARE.WIDTH

export default function drawGame (state) {
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
  const { currentTetromino } = state
  drawTetromino(currentTetromino)
}

function drawTetromino (tetromino) {
  forEachBlock(tetromino, (x, y) => {
    drawGridSquare(x, y, true)
  })
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
