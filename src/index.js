import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { fetchLocalHighScore } from './score'
import { isGameStarted, resizeGame, setIsSoftDropping, startGame } from './gameInfo'
import { moveDown, moveLeft, moveRight, rotate } from './tetromino'

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

dispatch(resizeGame())
dispatch(fetchLocalHighScore())

setInterval(() => {
  if (isGameStarted(store.getState())) {
    dispatch(moveDown())
  }
}, 2000) // level 0: 48 frames per block @ 24fps = 2000 ms

window.addEventListener('resize', () => dispatch(resizeGame()))
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

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
