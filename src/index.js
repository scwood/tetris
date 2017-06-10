import configureStore from './configureStore'
import drawGame from './drawGame'
import { KEY } from './constants'
import { moveLeft, moveRight, moveDown, rotate } from './actions'

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

setInterval(() => {
  dispatch(moveDown())
}, 400)

drawGame(store.getState())

document.addEventListener('keydown', handleKeydown)

function handleKeydown (e) {
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
  }
}
