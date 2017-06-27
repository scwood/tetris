export const END_GAME = 'END_GAME'
const START_GAME = 'START_GAME'
const RESIZE_GAME = 'RESIZE_GAME'
const ADD_POINTS = 'ADD_POINTS'
const INCREMENT_LINES = 'INCREMENT_LINES'
const UPDATE_HIGH_SCORE = 'UPDATE_HIGH_SCORE'

function initializeGameInfo () {
  return {
    started: false,
    gameOver: false,
    width: 0,
    height: 0,
    score: 0,
    highScore: 0,
    lines: 0
  }
}

export default function gameInfo (state = initializeGameInfo(), action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, started: true, gameOver: false, lines: 0, score: 0 }
    case END_GAME:
      return { ...state, started: false, gameOver: true }
    case RESIZE_GAME:
      return { ...state, width: action.width, height: action.height }
    case ADD_POINTS:
      return { ...state, score: state.score + action.points }
    case INCREMENT_LINES:
      return { ...state, lines: state.lines + 1 }
    case UPDATE_HIGH_SCORE:
      return { ...state, highScore: action.score }
    default:
      return state
  }
}

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

export function addPoints (points) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_POINTS, points })
    const { gameInfo: { score } } = getState()
    if (getLocalHighScore() <= score) {
      setLocalHighScore(score)
      dispatch(updateHighScore(score))
    }
  }
}

export function incrementLines () {
  return { type: INCREMENT_LINES }
}

export function fetchLocalHighScore () {
  return dispatch => {
    const localHighScore = getLocalHighScore()
    dispatch(updateHighScore(localHighScore))
  }
}

function updateHighScore (score) {
  return { type: UPDATE_HIGH_SCORE, score }
}

function getLocalHighScore () {
  const highScore = parseInt(window.localStorage.getItem('highScore'))
  return highScore && typeof highScore === 'number' ? highScore : 0
}

function setLocalHighScore(score) {
  window.localStorage.setItem('highScore', score)
}
