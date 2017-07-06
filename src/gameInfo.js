import { updateHighScores } from './score'

export const END_GAME = 'END_GAME'
export const START_GAME = 'START_GAME'
const RESIZE_GAME = 'RESIZE_GAME'
const SET_IS_SOFT_DROPPING = 'SET_IS_SOFT_DROPPING'
const INCREMENT_SPACES_SOFT_DROPPED = 'INCREMENT_SPACES_SOFT_DROPPED'
const RESET_SPACES_SOFT_DROPPED = 'RESET_SPACES_SOFT_DROPPED'

const initialState = {
  started: false,
  gameOver: false,
  width: 0,
  height: 0,
  isSoftDropping: false,
  spacesSoftDropped: 0
}

export default function gameInfo (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, started: true, gameOver: false }
    case END_GAME:
      return { ...state, started: false, gameOver: true, isSoftDropping: false }
    case RESIZE_GAME:
      return { ...state, width: action.width, height: action.height }
    case SET_IS_SOFT_DROPPING:
      return { ...state, isSoftDropping: action.isSoftDropping }
    case INCREMENT_SPACES_SOFT_DROPPED:
      return { ...state, spacesSoftDropped: state.spacesSoftDropped + 1 }
    case RESET_SPACES_SOFT_DROPPED:
      return { ...state, spacesSoftDropped: 0 }
    default:
      return state
  }
}

export const isGameStarted = state => state.gameInfo.started
export const isGameOver = state => state.gameInfo.gameOver
export const isSoftDropping = state => state.gameInfo.isSoftDropping
export const getWidth = state => state.gameInfo.width
export const getHeight = state => state.gameInfo.height
export const getSpacesSoftDropped = state => state.gameInfo.spacesSoftDropped

export function resizeGame () {
  const width = window.innerWidth - 20 // -20 for window padding
  const height = window.innerHeight - 20
  return { type: RESIZE_GAME, width, height }
}

export function startGame () {
  return { type: START_GAME }
}

export function endGame () {
  return dispatch => {
    dispatch(updateHighScores())
    dispatch({ type: END_GAME })
  }
}

export function setIsSoftDropping (isSoftDropping) {
  return dispatch => {
    if (!isSoftDropping) {
      dispatch(resetSpacesSoftDropped())
    }
    dispatch({ type: SET_IS_SOFT_DROPPING, isSoftDropping })
  }
}

export function incrementSpacesSoftDropped () {
  return { type: INCREMENT_SPACES_SOFT_DROPPED }
}

export function resetSpacesSoftDropped () {
  return { type: RESET_SPACES_SOFT_DROPPED }
}
