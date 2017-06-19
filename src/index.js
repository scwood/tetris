import WebFont from 'webfontloader'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { moveLeft, moveRight, moveDown, rotate, startGame } from './actions'

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

WebFont.load({
  google: {
    families: ['Roboto Mono']
  },
  active: start
})

function start () {
  drawGame(store.getState())
  setInterval(() => {
    if (store.getState().gameInfo.started) {
      dispatch(moveDown())
    }
  }, 200)
}

document.addEventListener('keydown', handleKeydown)

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
