import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { fetchLocalHighScore, getDropSpeedInMS } from './score'
import { isGameStarted, resizeGame, setIsSoftDropping, startGame } from './gameInfo'
import { moveDown, moveLeft, moveRight, rotate } from './tetromino'

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

dispatch(resizeGame())
dispatch(fetchLocalHighScore())
movePieceDownAutomatically()

window.addEventListener('resize', () => dispatch(resizeGame()))
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

function movePieceDownAutomatically () {
  if (isGameStarted(store.getState())) {
    dispatch(moveDown())
  }
  setTimeout(movePieceDownAutomatically, getDropSpeedInMS(store.getState()))
}

function handleKeyDown (e) {
  if (!isGameStarted(store.getState())) {
    if (e.keyCode === KEY.SPACE) {
      dispatch(startGame())
    }
    return
  }
  switch (e.keyCode) {
    case KEY.LEFT:
      dispatch(moveLeft())
      break
    case KEY.RIGHT:
      dispatch(moveRight())
      break
    case KEY.DOWN:
      dispatch(moveDown())
      dispatch(setIsSoftDropping(true))
      break
    case KEY.UP:
      dispatch(rotate())
      break
  }
}

function handleKeyUp (e) {
  if (isGameStarted(store.getState()) && e.keyCode === KEY.DOWN) {
    dispatch(setIsSoftDropping(false))
  }
}
