import { START_GAME } from './gameInfo'

const ADD_POINTS = 'ADD_POINTS'
const INCREMENT_LINES = 'INCREMENT_LINES'
const UPDATE_HIGH_SCORE = 'UPDATE_HIGH_SCORE'
const INCREMENT_LEVEL = 'INCREMENT_LEVEL'

const initialState = {
  currentScore: 0,
  highScore: 0,
  numberOfLines: 0,
  level: 0,
  startingLevel: 0
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
    case INCREMENT_LEVEL:
      return { ...state, level: state.level + 1 }
    default:
      return state
  }
}

export const getHighScore = state => state.score.highScore
export const getCurrentScore = state => state.score.currentScore
export const getNumberOfLines = state => state.score.numberOfLines
export const getLevel = state => state.score.level
const getStartingLevel = state => state.score.startingLevel

export function getDropSpeedInMS (state) {
  const framesPerSecond = 24
  let framesPerGridCell = 48
  const level = getLevel(state)
  if (level <= 8) {
    framesPerGridCell -= 5 * level
  }
  return (framesPerGridCell / framesPerSecond) * 1000
}

export function fetchLocalHighScore () {
  return dispatch => {
    const localHighScore = getLocalHighScore()
    dispatch(updateHighScore(localHighScore))
  }
}

export function incrementLines () {
  return (dispatch, getState) => {
    dispatch({ type: INCREMENT_LINES })
    const numberOfLines = getNumberOfLines(getState())
    const currentLevel = getLevel(getState())
    const startingLevel = getStartingLevel(getState())
    if (currentLevel === startingLevel) {
      const optionA = startingLevel * 10 + 10
      const optionB = Math.max(startingLevel * 10 - 50)
      if (numberOfLines === optionA || numberOfLines === optionB) {
        dispatch(incrementLevel())
      }
    } else if (numberOfLines % 10 === 0) {
      dispatch(incrementLevel())
    }
  }
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

function incrementLevel () {
  return { type: INCREMENT_LEVEL }
}
