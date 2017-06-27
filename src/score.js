import { START_GAME } from './gameInfo'

const ADD_POINTS = 'ADD_POINTS'
const INCREMENT_LINES = 'INCREMENT_LINES'
const UPDATE_HIGH_SCORE = 'UPDATE_HIGH_SCORE'

const initialState = {
  currentScore: 0,
  highScore: 0,
  numberOfLines: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINTS:
      return { ...state, currentScore: state.currentScore + action.points }
    case INCREMENT_LINES:
      return { ...state, numberOfLines: state.numberOfLines + 1 }
    case UPDATE_HIGH_SCORE:
      return { ...state, highScore: action.score }
    case START_GAME:
      return { ...state, currentScore: 0, numberOfLines: 0 }
    default:
      return state
  }
}

export const getHighScore = state => state.score.highScore
export const getCurrentScore = state => state.score.currentScore
export const getNumberOfLine = state => state.score.numberOfLines

export function fetchLocalHighScore () {
  return dispatch => {
    const localHighScore = getLocalHighScore()
    dispatch(updateHighScore(localHighScore))
  }
}

export function incrementLines () {
  return { type: INCREMENT_LINES }
}

export function addPoints (points) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_POINTS, points })
    const currentScore = getCurrentScore(getState())
    if (getLocalHighScore() <= currentScore) {
      setLocalHighScore(currentScore)
      dispatch(updateHighScore(currentScore))
    }
  }
}

function updateHighScore (score) {
  return { type: UPDATE_HIGH_SCORE, score }
}

function getLocalHighScore () {
  const highScore = parseInt(window.localStorage.getItem('highScore'))
  return highScore && typeof highScore === 'number' ? highScore : 0
}

function setLocalHighScore (score) {
  window.localStorage.setItem('highScore', score)
}
