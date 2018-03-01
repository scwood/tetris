import * as firebase from 'firebase'
import * as gameInfo from './gameInfo'
import * as level from './level'
import { POINTS } from '../constants'
import { stringValueOf } from '../utils'

const ADD_POINTS = 'ADD_POINTS'
const INCREMENT_LINES = 'INCREMENT_LINES'
const UPDATE_HIGH_SCORE = 'UPDATE_HIGH_SCORE'
const CLEAR_GLOBAL_HIGH_SCORES = 'CLEAR_GLOBAL_HIGH_SCORES'
const ADD_GLOBAL_HIGH_SCORE = 'ADD_GLOBAL_HIGH_SCORE'

const initialState = {
  currentScore: 0,
  highScore: 0,
  numberOfLines: 0,
  globalHighScores: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINTS:
      return { ...state, currentScore: state.currentScore + action.points }
    case INCREMENT_LINES:
      return { ...state, numberOfLines: state.numberOfLines + 1 }
    case UPDATE_HIGH_SCORE:
      return { ...state, highScore: action.score }
    case gameInfo.START_GAME:
      return { ...state, currentScore: 0, numberOfLines: 0 }
    case CLEAR_GLOBAL_HIGH_SCORES:
      return { ...state, globalHighScores: [] }
    case ADD_GLOBAL_HIGH_SCORE:
      return {
        ...state,
        globalHighScores: [ ...state.globalHighScores, action.highScore ]
      }
    default:
      return state
  }
}

export const getHighScore = state => state.score.highScore
export const getCurrentScore = state => state.score.currentScore
export const getNumberOfLines = state => state.score.numberOfLines
export const getGlobalHighScores = state => state.score.globalHighScores

export function getSortedGlobalHighScores (state) {
  return getGlobalHighScores(state).sort((a, b) => b.score - a.score)
}

export function fetchLocalHighScore () {
  return dispatch => {
    const localHighScore = getLocalHighScore()
    dispatch(updateHighScore(localHighScore))
  }
}

export function calculateAndAddPoints (numberOfRowsCleared) {
  return (dispatch, getState) => {
    const currentLevel = level.getCurrentLevel(getState())
    let pointsEarned = 0
    pointsEarned += POINTS[numberOfRowsCleared] * (currentLevel + 1)
    pointsEarned += gameInfo.getSpacesSoftDropped(getState())
    dispatch(addPoints(pointsEarned))
    dispatch(gameInfo.resetSpacesSoftDropped())
  }
}

export function incrementLines () {
  return (dispatch, getState) => {
    dispatch({ type: INCREMENT_LINES })
    if (level.canAdvanceToNextLevel(getState())) {
      dispatch(level.incrementCurrentLevel())
    }
  }
}

export function addPoints (points) {
  return { type: ADD_POINTS, points }
}

export function fetchGlobalHighScores () {
  return dispatch => {
    dispatch({ type: CLEAR_GLOBAL_HIGH_SCORES })
    firebase.database().ref('/highScores')
      .orderByChild('score')
      .limitToLast(10)
      .on('child_added', data => {
        dispatch({ type: ADD_GLOBAL_HIGH_SCORE, highScore: data.val() })
      })
  }
}

export function updateHighScores () {
  return (dispatch, getState) => {
    const currentScore = getCurrentScore(getState())
    const highScore = getHighScore(getState())
    if (currentScore > highScore) {
      setLocalHighScore(currentScore)
      dispatch(updateHighScore(currentScore))
    }
    const localName = getLocalName()
    let name = stringValueOf(window.prompt('Enter your name:', localName))
    name = name.trim()
    setLocalName(name)
    name = name === '' ? 'Anonymous' : name
    firebase.database().ref('/highScores').push({
      score: currentScore,
      level: level.getCurrentLevel(getState()),
      name
    })
      .then(() => dispatch(fetchGlobalHighScores()))
      .catch(error => console.error(error))
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

function getLocalName () {
  return stringValueOf(window.localStorage.getItem('name'))
}

function setLocalName (name) {
  window.localStorage.setItem('name', name)
}
