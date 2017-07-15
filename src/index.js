import * as firebase from 'firebase'
import * as gameInfo from './models/gameInfo'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { fetchLocalHighScore, fetchGlobalHighScores } from './models/score'
import { getDropSpeedInMS, incrementStartingLevel } from './models/level'
import { moveDown, moveLeft, moveRight, rotate } from './models/tetromino'

console.log('Testing')

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
  const isGameStarted = gameInfo.isGameStarted(store.getState())
  if (isGameStarted) {
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
  } else {
    switch (e.keyCode) {
      case KEY.SPACE:
        dispatch(gameInfo.startGame())
        break
      case KEY.I:
        dispatch(incrementStartingLevel())
        break
    }
  }
}

function handleKeyUp (e) {
  if (gameInfo.isGameStarted(store.getState()) && e.keyCode === KEY.DOWN) {
    dispatch(gameInfo.setIsSoftDropping(false))
  }
}
