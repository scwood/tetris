export function forEachBlock (tetromino, fn) {
  return generateBlocks(tetromino).forEach(args => fn(...args))
}

export function everyBlock (tetromino, fn) {
  return generateBlocks(tetromino).every(args => fn(...args))
}

export function someBlock (tetromino, fn) {
  return generateBlocks(tetromino).some(args => fn(...args))
}

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function generateBlocks ({ shape, x, y }) {
  const blocks = []
  let row = 0
  let col = 0
  for (let bit = 0x8000; bit > 0; bit = bit >> 1) {
    if (shape & bit) {
      blocks.push([x + col, y + row])
    }
    if (++col === 4) {
      col = 0
      ++row
    }
  }
  return blocks
}
