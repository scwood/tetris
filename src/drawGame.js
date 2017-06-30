import { BOARD, COLORS } from './constants'
import { forEachBlock } from './utils'
import { getCurrentScore, getHighScore, getNumberOfLines } from './score'
import { getGrid } from './grid'
import { getHeight, getWidth, isGameOver, isGameStarted } from './gameInfo'
import { getCurrentLevel } from './level'
import { getNextTetromino, getTetromino } from './tetromino'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const { WIDTH, HEIGHT } = BOARD
let blockSize

export default function drawGame (state) {
  resizeCanvas(canvas, state)
  drawGrid(state)
  drawInfo(state)
  if (isGameStarted(state)) {
    drawCurrentTetromino(state)
  } else {
    drawStartScreen(state)
  }
}

function drawStartScreen (state) {
  ctx.fillStyle = 'black'
  ctx.fillText('Press <space> to start', actual(1.7), actual(HEIGHT) / 2.07)
  if (isGameOver(state)) {
    ctx.fillText('Game over', actual(3.7), (actual(HEIGHT) / 4.3))
  }
}

function drawGrid (state) {
  getGrid(state).forEach((row, y) => {
    row.forEach((color, x) => {
      drawGridSquare(x, y, color)
    })
  })
}

function drawCurrentTetromino (state) {
  const tetromino = getTetromino(state)
  drawTetromino(tetromino)
}

function drawNextTetromino (state) {
}

function drawTetromino (tetromino) {
  forEachBlock(tetromino, (x, y) => {
    drawGridSquare(x, y, tetromino.color)
  })
}

function drawInfo (state) {
  drawInfoElement(`High Score: ${getHighScore(state)}`, actual(1))
  drawInfoElement(`Score: ${getCurrentScore(state)}`, actual(3))
  drawInfoElement(`Lines: ${getNumberOfLines(state)}`, actual(4))
  drawInfoElement(`Level: ${getCurrentLevel(state)}`, actual(5))
  if (isGameStarted(state)) {
    const nextTetromino = getNextTetromino(state)
    drawInfoElement(`Next piece:`, actual(7))
    drawTetromino({ ...nextTetromino, x: 10.7, y: 7 })
    drawNextTetromino(state)
  }
}

function drawInfoElement (text, y) {
  ctx.fillStyle = 'black'
  ctx.fillText(text, actual(WIDTH) * 1.07, y)
}

function drawGridSquare (x, y, color) {
  color = color || COLORS.LIGHT_GRAY
  drawSquare(actual(x), actual(y), actual(1), color)
}

function drawSquare (x, y, width, color) {
  ctx.beginPath()
  ctx.rect(x, y, width, width)
  ctx.fillStyle = color
  ctx.strokeStyle = COLORS.WHITE
  ctx.lineWidth = blockSize / 10
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

function resizeCanvas (canvas, state) {
  const width = getWidth(state)
  const height = getHeight(state)
  const ratio = getPixelRatio()
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
  blockSize = height / 20
  ctx.font = `${blockSize / 2}px monospace`
}

function actual (n) {
  return blockSize * n
}
