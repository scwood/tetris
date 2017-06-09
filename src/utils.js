function eachBlock (shape, x, y, fn) {
  let row = 0
  let col = 0
  for (let bit = 0x8000; bit > 0; bit = bit >> 1) {
    if (shape & bit) {
      fn(x + col, y + row)
    }
    if (++col === 4) {
      col = 0
      ++row
    }
  }
}

module.exports = {
  eachBlock
}
