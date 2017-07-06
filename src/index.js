import * as firebase from 'firebase'
import * as gameInfo from './gameInfo'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { fetchLocalHighScore, fetchGlobalHighScores } from './score'
import { getDropSpeedInMS } from './level'
import { moveDown, moveLeft, moveRight, rotate } from './tetromino'

const firebaseConfig = {
  apiKey: 'AIzaSyBKR3W8dwyU_XdpE9yWIoSFfP6_mIacJkc',
  databaseURL: 'https://tetris-ccabb.firebaseio.com',
  projectId: 'tetris-ccabb'
}
firebase.initializeApp(firebaseConfig)

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

dispatch(gameInfo.resizeGame())
dispatch(fetchLocalHighScore())
dispatch(fetchGlobalHighScores())
start()

window.addEventListener('resize', () => dispatch(gameInfo.resizeGame()))
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

function start () {
  if (gameInfo.isGameStarted(store.getState())) {
    dispatch(moveDown())
  }
  setTimeout(start, getDropSpeedInMS(store.getState()))
}

function handleKeyDown (e) {
  if (!gameInfo.isGameStarted(store.getState())) {
    if (e.keyCode === KEY.SPACE) {
      dispatch(gameInfo.startGame())
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
      dispatch(gameInfo.setIsSoftDropping(true))
      break
    case KEY.UP:
      dispatch(rotate())
      break
  }
}

function handleKeyUp (e) {
  if (gameInfo.isGameStarted(store.getState()) && e.keyCode === KEY.DOWN) {
    dispatch(gameInfo.setIsSoftDropping(false))
  }
}
