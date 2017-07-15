import { BOARD, TETROMINOS } from '../constants'
import { addTetrominoToGrid, clearCompletedRows, getGrid } from './grid'
import { endGame, incrementSpacesSoftDropped, isSoftDropping } from './gameInfo'
import { everyBlock, getRandomInt, someBlock } from '../utils'

const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const ROTATE = 'ROTATE'
const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'

function initializeState () {
  const tetromino = generateRandomTetromino()
  const nextTetromino = generateRandomTetromino(tetromino.index)
  return { ...tetromino, nextTetromino }
}

export default function tetromino (state = initializeState(), action) {
  switch (action.type) {
    case MOVE_LEFT:
      return { ...state, x: state.x - 1 }
    case MOVE_RIGHT:
      return { ...state, x: state.x + 1 }
    case MOVE_DOWN:
      return { ...state, y: state.y + 1 }
    case ADD_NEW_TETROMINO:
      return {
        ...state.nextTetromino,
        nextTetromino: action.nextTetromino
      }
    case ROTATE:
      return { ...state, rotation: action.rotation }
    default:
      return state
  }
}

export const getTetromino = state => state.tetromino
export const getNextTetromino = state => state.tetromino.nextTetromino

export function moveDown () {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState())
    const grid = getGrid(getState())
    if (hasHitBottom(tetromino, grid)) {
      if (hasHitTop(tetromino)) {
        dispatch(endGame())
        return
      }
      dispatch(addTetrominoToGrid())
      dispatch(clearCompletedRows())
      dispatch(addNewTetromino())
      return
    }
    if (isValidPlacement({ ...tetromino, y: tetromino.y + 1 }, grid)) {
      dispatch({ type: MOVE_DOWN })
      if (isSoftDropping(getState())) {
        dispatch(incrementSpacesSoftDropped())
      }
    }
  }
}

export function moveRight () {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState())
    const grid = getGrid(getState())
    if (isValidPlacement({ ...tetromino, x: tetromino.x + 1 }, grid)) {
      dispatch({ type: MOVE_RIGHT })
    }
  }
}

export function moveLeft () {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState())
    const grid = getGrid(getState())
    if (isValidPlacement({ ...tetromino, x: tetromino.x - 1 }, grid)) {
      dispatch({ type: MOVE_LEFT })
    }
  }
}

export function rotate () {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState())
    const grid = getGrid(getState())
    const newRotation = getNextRotation(tetromino)
    if (isValidPlacement({ ...tetromino, rotation: newRotation }, grid)) {
      dispatch({ type: ROTATE, rotation: newRotation })
    }
  }
}

function addNewTetromino () {
  return (dispatch, getState) => {
    const { index } = getNextTetromino(getState())
    const nextTetromino = generateRandomTetromino(index)
    dispatch({ type: ADD_NEW_TETROMINO, nextTetromino })
  }
}

function isValidPlacement (tetromino, grid) {
  return everyBlock(tetromino, (x, y) => {
    if (x < 0 || x > BOARD.WIDTH - 1) {
      return false
    }
    if (y > BOARD.HEIGHT - 1) {
      return false
    }
    if (y > 0 && grid[y][x]) {
      return false
    }
    return true
  })
}

function hasHitBottom (tetromino, grid) {
  return someBlock(tetromino, (x, y) => {
    if (y < 0) {
      return false
    }
    return y === BOARD.HEIGHT - 1 || grid[y + 1][x]
  })
}

function hasHitTop (tetromino) {
  return someBlock(tetromino, (x, y) => {
    return y <= 0
  })
}

function getNextRotation (tetromino) {
  const { index, rotation } = tetromino
  const { rotations } = TETROMINOS[index]
  const oldRotationIndex = rotations.indexOf(rotation)
  const newRotationIndex = (oldRotationIndex + 1) % rotations.length
  return rotations[newRotationIndex]
}

function generateRandomTetromino (previousIndex) {
  let newIndex
  const firstRoll = getRandomInt(0, 7)
  if (firstRoll === 7 || firstRoll === previousIndex) {
    newIndex = getRandomInt(0, 6)
  } else {
    newIndex = firstRoll
  }
  const { rotations, color } = TETROMINOS[newIndex]
  const rotation = rotations[0]
  return {
    index: newIndex,
    x: 3,
    y: -2,
    color,
    rotation
  }
}
