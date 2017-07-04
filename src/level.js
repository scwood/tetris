import { START_GAME, END_GAME } from './gameInfo'
import { getNumberOfLines } from './score'

const INCREMENT_CURRENT_LEVEL = 'INCREMENT_CURRENT_LEVEL'

const initialState = {
  current: 0,
  starting: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREMENT_CURRENT_LEVEL:
      return { ...state, current: state.current + 1 }
    case START_GAME:
      return { ...state, current: state.starting }
    case END_GAME:
      return { ...state, starting: 0 }
    default:
      return state
  }
}

export const getCurrentLevel = state => state.level.current
export const getStartingLevel = state => state.level.starting

export function canAdvanceToNextLevel (state) {
  const numberOfLines = getNumberOfLines(state)
  const currentLevel = getCurrentLevel(state)
  const startingLevel = getStartingLevel(state)
  if (currentLevel === startingLevel) {
    const optionA = startingLevel * 10 + 10
    const optionB = Math.max(startingLevel * 10 - 50)
    if (numberOfLines === optionA || numberOfLines === optionB) {
      return true
    }
  } else if (numberOfLines % 10 === 0) {
    return true
  }
  return false
}

export function getDropSpeedInMS (state) {
  const framesPerSecond = 60
  const level = getCurrentLevel(state)
  let framesPerGridCell = 48
  if (level <= 8) {
    framesPerGridCell -= 5 * level
  } else if (level === 9) {
    framesPerGridCell = 6
  } else if (level >= 10 && level <= 12) {
    framesPerGridCell = 5
  } else if (level >= 13 && level <= 15) {
    framesPerGridCell = 4
  } else if (level >= 16 && level <= 18) {
    framesPerGridCell = 3
  } else if (level >= 19 && level <= 28) {
    framesPerGridCell = 2
  } else {
    framesPerGridCell = 1
  }
  framesPerGridCell += 1 // add one frame for the 'drop'
  return (framesPerGridCell / framesPerSecond) * 1000
}

export function incrementLevel () {
  return { type: INCREMENT_CURRENT_LEVEL }
}
