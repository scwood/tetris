import WebFont from 'webfontloader'
import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import * as actions from './actions'

const store = configureStore()
const { dispatch } = store

WebFont.load({
  google: {
    families: ['Roboto Mono']
  },
  active: start
})

function start () {
  store.subscribe(() => {
    drawGame(store.getState())
  })

  dispatch(actions.resizeGame())

  setInterval(() => {
    if (store.getState().gameInfo.started) {
      dispatch(actions.moveDown())
    }
  }, 200)

  window.onresize = handleResize
  document.addEventListener('keydown', handleKeydown)
}

function handleKeydown (e) {
  if (!store.getState().gameInfo.started) {
    if (e.keyCode === KEY.SPACE) {
      dispatch(actions.startGame())
    }
    return
  }
  switch (e.keyCode) {
    case KEY.LEFT:
      dispatch(actions.moveLeft())
      break
    case KEY.RIGHT:
      dispatch(actions.moveRight())
      break
    case KEY.DOWN:
      dispatch(actions.moveDown())
      break
    case KEY.UP:
      dispatch(actions.rotate())
      break
  }
}

function handleResize () {
  dispatch(actions.resizeGame())
}
