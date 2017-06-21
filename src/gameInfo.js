export const END_GAME = 'END_GAME'
const START_GAME = 'START_GAME'
const RESIZE_GAME = 'RESIZE_GAME'

export default function gameInfo (state = initializeGameInfo(), action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, started: true, gameOver: false }
    case END_GAME:
      return { ...state, started: false, gameOver: true }
    case RESIZE_GAME:
      return { ...state, width: action.width, height: action.height }
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

function initializeGameInfo () {
  return {
    started: false,
    gameOver: false,
    width: 0,
    height: 0
  }
}
