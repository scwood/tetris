import WebFont from 'webfontloader'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { moveDown, moveLeft, moveRight, rotate } from './tetromino'
import { resizeGame, startGame } from './gameInfo'

WebFont.load({
  google: {
    families: ['Roboto Mono']
  },
  active: start,
  inactive: start
})

const store = configureStore()
const { dispatch } = store

function start () {
  store.subscribe(() => {
    drawGame(store.getState())
  })

  handleResize()

  setInterval(() => {
    if (store.getState().gameInfo.started) {
      dispatch(moveDown())
    }
  }, 200)

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
