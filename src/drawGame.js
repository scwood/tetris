import { BOARD, BLOCK, COLORS } from './constants'
import { forEachBlock } from './utils'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

canvas.height = BOARD.HEIGHT * BLOCK.WIDTH
canvas.width = BOARD.WIDTH * BLOCK.WIDTH

export default function drawGame (state) {
  drawGrid(state)
  drawCurrentTetrimino(state)
}

function drawGrid (state) {
  state.grid.forEach((row, y) => {
    row.forEach((color, x) => {
      drawGridSquare(x, y, color)
    })
  })
}

function drawCurrentTetrimino (state) {
  const { tetromino } = state
  drawTetromino(tetromino)
}

function drawTetromino (tetromino) {
  forEachBlock(tetromino, (x, y) => {
    drawGridSquare(x, y, tetromino.color)
  })
}

function drawGridSquare (x, y, color) {
  color = color || COLORS.BLACK
  drawSquare(x * BLOCK.WIDTH, y * BLOCK.WIDTH, BLOCK.WIDTH, color)
}

function drawSquare (x, y, width, color) {
  ctx.beginPath()
  ctx.rect(x, y, width, width)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}
