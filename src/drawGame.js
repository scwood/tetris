import { BOARD, BLOCK, COLORS } from './constants'
import { forEachBlock } from './utils'

const canvas = createHiResolutionCanvas(BOARD.WIDTH * BLOCK.WIDTH,
  BOARD.HEIGHT * BLOCK.WIDTH)
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')
ctx.font = '1em "Roboto Mono", monospace'
ctx.strokeStyle = COLORS.BLACK

export default function drawGame (state) {
  drawGrid(state)
  if (state.gameInfo.started) {
    drawCurrentTetrimino(state)
  } else {
    drawStartScreen(state)
  }
}

function drawStartScreen (state) {
  ctx.fillStyle = 'black'
  ctx.fillText('Press <space> to start', 40,
    (BOARD.HEIGHT * BLOCK.WIDTH) / 2 - 20)
  if (state.gameInfo.gameOver) {
    ctx.fillText('Game over', 100, (BOARD.HEIGHT * BLOCK.WIDTH) / 4 - 20)
  }
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
  forEachBlock(tetromino, (x, y) => {
    drawGridSquare(x, y, tetromino.color)
  })
}

function drawGridSquare (x, y, color) {
  color = color || COLORS.LIGHT_GRAY
  drawSquare(x * BLOCK.WIDTH, y * BLOCK.WIDTH, BLOCK.WIDTH, color)
}

function drawSquare (x, y, width, color) {
  ctx.beginPath()
  ctx.rect(x, y, width, width)
  ctx.fillStyle = color
  ctx.strokeStyle = COLORS.LIGHT_GRAY
  ctx.lineWidth = 2
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

function getPixelRatio () {
  const ctx = document.createElement('canvas').getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const bsr = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  return dpr / bsr
}

function createHiResolutionCanvas (width, height) {
  const ratio = getPixelRatio()
  const canvas = document.createElement('canvas')
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
  return canvas
}
