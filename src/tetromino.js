import { END_GAME } from './gameInfo'
import { TETROMINOS, BOARD } from './constants'
import { addTetrominoToGrid, clearCompletedRows } from './grid'
import { getRandomInt, everyBlock, someBlock } from './utils'

const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const ROTATE = 'ROTATE'
const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'

export default function tetromino (state = initializeTetromino(), action) {
  switch (action.type) {
    case MOVE_LEFT:
      return { ...state, x: state.x - 1 }
    case MOVE_RIGHT:
      return { ...state, x: state.x + 1 }
    case MOVE_DOWN:
      return { ...state, y: state.y + 1 }
    case ADD_NEW_TETROMINO:
      return initializeTetromino()
    case ROTATE:
      return { ...state, rotation: action.rotation }
    default:
      return state
  }
}

export function moveDown () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (hasHitBottom(tetromino, grid)) {
      if (hasHitTop(tetromino)) {
        dispatch({ type: END_GAME })
        return
      }
      dispatch(addTetrominoToGrid())
      dispatch(clearCompletedRows())
      dispatch({ type: ADD_NEW_TETROMINO })
      return
    }
    if (!isValidPlacement({...tetromino, y: tetromino.y + 1}, grid)) {
      return
    }
    dispatch({ type: MOVE_DOWN })
  }
}

export function moveRight () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x + 1 }, grid)) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

export function moveLeft () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    if (isValidPlacement({ ...tetromino, x: tetromino.x - 1 }, grid)) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

export function rotate () {
  return (dispatch, getState) => {
    const { tetromino, grid } = getState()
    const newRotation = getNextRotation(tetromino)
    if (isValidPlacement({ ...tetromino, rotation: newRotation }, grid)) {
      dispatch({ type: ROTATE, rotation: newRotation })
    }
  }
}

function initializeTetromino () {
  const tetrominoNames = Object.keys(TETROMINOS)
  const index = getRandomInt(0, tetrominoNames.length - 1)
  const newTetrominoName = tetrominoNames[index]
  const { rotations, color } = TETROMINOS[newTetrominoName]
  const rotation = rotations[0]
  return {
    name: newTetrominoName,
    x: (BOARD.WIDTH / 2) - 2,
    y: -1,
    color,
    rotation
  }
}

function isValidPlacement (tetromino, grid) {
  return everyBlock(tetromino, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      return false
    }
    if (y < 0 || y > BOARD.HEIGHT - 1) {
      return false
    }
    if (grid[y][x]) {
      return false
    }
    return true
  })
}

function hasHitBottom (tetromino, grid) {
  return someBlock(tetromino, (x, y) => {
    return y === BOARD.HEIGHT - 1 || grid[y + 1][x]
  })
}

function hasHitTop (tetromino) {
  return someBlock(tetromino, (x, y) => {
    return y <= 0
  })
}

function getNextRotation (tetromino) {
  const { name, rotation } = tetromino
  const { rotations } = TETROMINOS[name]
  const oldIndex = rotations.indexOf(rotation)
  const newIndex = (oldIndex + 1) % rotations.length
  return rotations[newIndex]
}
