export const BOARD = {
  HEIGHT: 20,
  WIDTH: 10,
};

export const COLORS = {
  WHITE: '#ffffff',
  LIGHT_GRAY: '#eeeeee',
  DARK_GRAY: '#999999',
  CYAN: '#03a9f4',
  BLUE: '#0d47a1',
  ORANGE: '#ff9100',
  YELLOW: '#fdd835',
  GREEN: '#8bc34a',
  MAGENTA: '#7e57c2',
  RED: '#ef5350',
};

export const TETROMINOS = [
  {rotations: [0x00f0, 0x2222], color: COLORS.CYAN}, // I
  {rotations: [0x0071, 0x0226, 0x0470, 0x0322], color: COLORS.BLUE}, // J
  {rotations: [0x0074, 0x0622, 0x0170, 0x0223], color: COLORS.ORANGE}, // L
  {rotations: [0x0066], color: COLORS.YELLOW}, // O
  {rotations: [0x0036, 0x0231], color: COLORS.GREEN}, // S
  {rotations: [0x0072, 0x0262, 0x0270, 0x0232], color: COLORS.MAGENTA}, // T
  {rotations: [0x0063, 0x0132], color: COLORS.RED}, // Z
];

export const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  I: 73,
};

export const POINTS = [0, 40, 100, 300, 1200];
