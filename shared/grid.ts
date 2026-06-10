import type { CellTuple, GridCoord, PieceBounds } from './puzzle';

export const DEFAULT_PIECE_THICKNESS = 18;

export function cellKey(row: number, col: number): string {
  return `${row}:${col}`;
}

export function tupleToCoord(tuple: CellTuple): GridCoord {
  return { row: tuple[0], col: tuple[1] };
}

export function getPieceBounds(cells: GridCoord[]): PieceBounds {
  const rows = cells.map((cell) => cell.row);
  const cols = cells.map((cell) => cell.col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  return {
    minRow,
    minCol,
    maxRow,
    maxCol,
    width: maxCol - minCol + 1,
    height: maxRow - minRow + 1,
  };
}

export function translateCells(cells: GridCoord[], origin: GridCoord): GridCoord[] {
  return cells.map((cell) => ({
    row: origin.row + cell.row,
    col: origin.col + cell.col,
  }));
}

export function isWholeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}
