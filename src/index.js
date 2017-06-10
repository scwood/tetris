const configureStore = require('./configureStore')
const drawGame = require('./drawGame')
const { KEY } = require('./constants')
const {
  attemptToMoveLeft,
  attemptToMoveRight,
  attemptToMoveDown
} = require('./actions')

const store = configureStore()
const { dispatch } = store

store.subscribe(() => {
  drawGame(store.getState())
})

setInterval(() => {
  dispatch(attemptToMoveDown())
}, 400)

drawGame(store.getState())

document.addEventListener('keydown', handleKeydown)

function handleKeydown (e) {
  switch (e.keyCode) {
    case KEY.LEFT:
      dispatch(attemptToMoveLeft())
      break
    case KEY.RIGHT:
      dispatch(attemptToMoveRight())
      break
    case KEY.DOWN:
      dispatch(attemptToMoveDown())
      break
  }
}
