export const BOARD = {
  HEIGHT: 20,
  WIDTH: 10
}

export const SQUARE = {
  WIDTH: 30
}

export const COLORS = {
  BLACK: '#232C31'
}

export const TETROMINOS = {
  I: { rotations: [0x0F00, 0x2222, 0x00F0, 0x4444], color: '#5E8D87' },
  J: { rotations: [0x0E20, 0x44C0, 0x8E00, 0x6440], color: '#5F819D' },
  L: { rotations: [0x0E80, 0xC440, 0x2E00, 0x4460], color: '#85678F' },
  O: { rotations: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: '#6C7A80' },
  S: { rotations: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: '#B5BD68' },
  T: { rotations: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: '#DE935F' },
  Z: { rotations: [0x0C60, 0x4C80, 0xC600, 0x2640], color: '#A54242' }
}

export const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
