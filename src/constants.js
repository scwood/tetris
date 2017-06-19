export const BOARD = {
  HEIGHT: 20,
  WIDTH: 10
}

export const COLORS = {
  LIGHT_GRAY: '#eeeeee',
  DARK_GRAY: '#999999',
  CYAN: '#03a9f4',
  BLUE: '#0d47a1',
  ORANGE: '#ff9100',
  YELLOW: '#fdd835',
  GREEN: '#8bc34a',
  MAGENTA: '#7e57c2',
  RED: '#ef5350'
}

export const TETROMINOS = {
  I: { rotations: [0x0F00, 0x2222, 0x00F0, 0x4444], color: COLORS.CYAN },
  J: { rotations: [0x0E20, 0x44C0, 0x8E00, 0x6440], color: COLORS.BLUE },
  L: { rotations: [0x0E80, 0xC440, 0x2E00, 0x4460], color: COLORS.ORANGE },
  O: { rotations: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: COLORS.YELLOW },
  S: { rotations: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: COLORS.GREEN },
  T: { rotations: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: COLORS.MAGENTA },
  Z: { rotations: [0x0C60, 0x4C80, 0xC600, 0x2640], color: COLORS.RED }
}

export const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
