export const END_GAME = 'END_GAME'
export const START_GAME = 'START_GAME'
const RESIZE_GAME = 'RESIZE_GAME'
const SET_IS_SOFT_DROPPING = 'SET_IS_SOFT_DROPPING'

const initialState = {
  started: false,
  gameOver: false,
  width: 0,
  height: 0,
  isSoftDropping: false
}

export default function gameInfo (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, started: true, gameOver: false }
    case END_GAME:
      return { ...state, started: false, gameOver: true, softDrop: false }
    case RESIZE_GAME:
      return { ...state, width: action.width, height: action.height }
    case SET_IS_SOFT_DROPPING:
      return { ...state, isSoftDropping: action.isSoftDropping }
    default:
      return state
  }
}

export const isGameStarted = state => state.gameInfo.started
export const isGameOver = state => state.gameInfo.gameOver
export const getWidth = state => state.gameInfo.width
export const getHeight = state => state.gameInfo.height

export function resizeGame () {
  const width = window.innerWidth - 20 // -20 for window padding
  const height = window.innerHeight - 20
  return { type: RESIZE_GAME, width, height }
}

export function startGame () {
  return { type: START_GAME }
}

export function endGame () {
  return { type: END_GAME }
}

export function setIsSoftDropping(isSoftDropping) {
  return { type: SET_IS_SOFT_DROPPING, isSoftDropping }
}
