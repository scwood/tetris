import {END_GAME} from './gameInfo';
import {TETROMINOS} from '../constants';
import {calculateAndAddPoints, incrementLines} from './score';
import {forEachBlock} from '../utils';
import {getTetromino} from './tetromino';

const SET_GRID_COLOR = 'SET_GRID_COLOR';
const CLEAR_ROWS = 'CLEAR_ROWS';

function initializeGrid() {
  return new Array(20).fill(initializeGridRow());
}

export default function grid(state = initializeGrid(), action) {
  let newGrid;
  const {x, y, color, rowsToClear} = action;
  switch (action.type) {
    case SET_GRID_COLOR:
      newGrid = clone2DArray(state);
      newGrid[y][x] = color;
      return newGrid;
    case CLEAR_ROWS:
      newGrid = clone2DArray(state).filter((row, i) => {
        return rowsToClear.indexOf(i) === -1;
      });
      return rowsToClear.map(() => initializeGridRow()).concat(newGrid);
    case END_GAME:
      return initializeGrid();
    default:
      return state;
  }
}

export const getGrid = (state) => state.grid;

export function clearCompletedRows() {
  return (dispatch, getState) => {
    const grid = getGrid(getState());
    const rowsToClear = grid
      .map((row, i) => i)
      .filter((i) => grid[i].every((x) => x));
    dispatch(calculateAndAddPoints(rowsToClear.length));
    rowsToClear.forEach(() => dispatch(incrementLines()));
    dispatch({type: CLEAR_ROWS, rowsToClear});
  };
}

export function addTetrominoToGrid() {
  return (dispatch, getState) => {
    const tetromino = getTetromino(getState());
    forEachBlock(tetromino, (x, y) => {
      const color = TETROMINOS[tetromino.index].color;
      dispatch({type: SET_GRID_COLOR, x, y, color});
    });
  };
}

function initializeGridRow() {
  return new Array(10).fill(false);
}

export function clone2DArray(arr) {
  return arr.map((row) => row.slice());
}
