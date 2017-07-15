import * as score from './models/score'
import { BOARD, COLORS } from './constants'
import { forEachBlock } from './utils'
import { getCurrentLevel, getStartingLevel } from './models/level'
import { getGrid } from './models/grid'
import { getHeight, getWidth, isGameOver, isGameStarted } from './models/gameInfo'
import { getNextTetromino, getTetromino } from './models/tetromino'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

document.body.style.padding = '10px'
document.body.style.margin = '0px'
canvas.style.display = 'block'

const { WIDTH } = BOARD
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
  ctx.fillText('Press <space> to start', actual(1.7), actual(9.65))
  ctx.fillText('Press <i> to increase level', actual(0.95), actual(10.65))
  if (isGameOver(state)) {
    ctx.fillText('Game over', actual(3.65), actual(4.65))
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

function drawTetromino (tetromino) {
  forEachBlock(tetromino, (x, y) => {
    drawGridSquare(x, y, tetromino.color)
  })
}

function drawInfo (state) {
  const highScore = score.getHighScore(state).toLocaleString()
  const currentScore = score.getCurrentScore(state).toLocaleString()
  const currentLevel = getCurrentLevel(state)
  const startingLevel = getStartingLevel(state)
  let displayedLevel
  if (
    (startingLevel > currentLevel) ||
    (isGameOver(state) && startingLevel > 0)
  ) {
    displayedLevel = startingLevel
  } else {
    displayedLevel = currentLevel
  }
  drawInfoElement(`High Score: ${highScore}`, actual(1))
  drawInfoElement(`Score: ${currentScore}`, actual(3))
  drawInfoElement(`Lines: ${score.getNumberOfLines(state)}`, actual(4))
  drawInfoElement(`Level: ${displayedLevel}`, actual(5))
  if (isGameStarted(state)) {
    drawNextTetromino(state)
  } else {
    drawHighScores(state)
  }
}

function drawNextTetromino (state) {
  const nextTetromino = getNextTetromino(state)
  drawInfoElement(`Next piece:`, actual(7))
  // special case the I piece because it's long
  if (nextTetromino.index === 0) {
    drawTetromino({ ...nextTetromino, x: 10.7, y: 6 })
  } else {
    drawTetromino({ ...nextTetromino, x: 9.7, y: 6 })
  }
}

function drawHighScores (state) {
  const globalHighScores = score.getSortedGlobalHighScores(state)
  if (globalHighScores.length === 0) {
    return
  }
  drawInfoElement('Global High Scores:', actual(7))
  const highScoreRows = globalHighScores
    .map(({ score, level, name }, i) => {
      return [`${i + 1}.`, score.toLocaleString(), level, name]
    })
  highScoreRows.unshift(['', 'Score', 'Level', 'Name'])

  const formattedRows = generateTableRows(highScoreRows)
  for (let i = 0; i < 11; i++) { // 11 rows including header
    drawInfoElement(formattedRows[i], actual(8 + i))
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

function generateTableRows (rows) {
  const columnWidths = []
  rows.forEach(row => {
    row.forEach((value, i) => {
      if (
        columnWidths[i] === undefined ||
        columnWidths[i] < value.toString().length
      ) {
        columnWidths[i] = value.length
      }
    })
  })
  return rows.map(row => {
    return row.map((value, i) => {
      return rightPad(value, ' ', columnWidths[i])
    }).join('  ')
  })
}

function rightPad (str, char, length) {
  return (str.toString() + char.repeat(length)).substr(0, length)
}
