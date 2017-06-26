import WebFont from 'webfontloader'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { moveDown, moveLeft, moveRight, rotate } from './tetromino'
import { resizeGame, startGame } from './gameInfo'

const store = configureStore()
const { dispatch } = store
start()

function start () {
  store.subscribe(() => {
    drawGame(store.getState())
  })

  handleResize()

  setInterval(() => {
    if (store.getState().gameInfo.started) {
      dispatch(moveDown())
    }
  }, 2000) // level 0: 48 frames per block @ 24fps = 2000 ms

  window.onresize = handleResize
  document.addEventListener('keydown', handleKeydown)
}

function handleKeydown (e) {
  if (!store.getState().gameInfo.started) {
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
      break
    case KEY.UP:
      dispatch(rotate())
      break
  }
}

function handleResize () {
  dispatch(resizeGame())
}
