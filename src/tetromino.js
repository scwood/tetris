import { TETROMINOS, BOARD } from './constants'
import { addTetrominoToGrid, clearCompletedRows, getGrid } from './grid'
import { getRandomInt, everyBlock, someBlock } from './utils'
import { addPoints } from './score'
import {
  endGame,
  getSpacesSoftDropped,
  incrementSpacesSoftDropped,
  isSoftDropping,
  resetSpacesSoftDropped
} from './gameInfo'

const MOVE_DOWN = 'MOVE_DOWN'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const ROTATE = 'ROTATE'
const ADD_NEW_TETROMINO = 'ADD_NEW_TETROMINO'

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

export const getTetromino = state => state.tetromino

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
      const spacesSoftDropped = getSpacesSoftDropped(getState())
      dispatch(addPoints(spacesSoftDropped))
      dispatch(resetSpacesSoftDropped())
      dispatch({ type: ADD_NEW_TETROMINO })
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
