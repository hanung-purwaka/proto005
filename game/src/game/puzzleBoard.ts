import type { CompiledLevelData, CompiledPieceData, GridCoord } from '@shared/puzzle';
import type { AxisRange, PieceState } from './runtimeTypes';

export class PuzzleBoard {
  private readonly pieces = new Map<string, PieceState>();
  private readonly occupancy: Array<Array<string | null>>;

  constructor(private readonly level: CompiledLevelData) {
    this.occupancy = Array.from({ length: level.grid.rows }, () =>
      Array<string | null>(level.grid.cols).fill(null),
    );

    for (const piece of level.pieces) {
      this.pieces.set(piece.id, {
        data: piece,
        row: piece.startOrigin.row,
        col: piece.startOrigin.col,
      });
    }

    this.rebuildOccupancy();
  }

  getLevel(): CompiledLevelData {
    return this.level;
  }

  getPieces(): PieceState[] {
    return Array.from(this.pieces.values());
  }

  getPiece(pieceId: string): PieceState {
    const piece = this.pieces.get(pieceId);

    if (!piece) {
      throw new Error(`Unknown piece: ${pieceId}`);
    }

    return piece;
  }

  movePiece(pieceId: string, row: number, col: number): void {
    const piece = this.getPiece(pieceId);
    piece.row = row;
    piece.col = col;
    this.rebuildOccupancy();
  }

  getOccupant(row: number, col: number): string | null {
    if (row < 0 || row >= this.level.grid.rows || col < 0 || col >= this.level.grid.cols) {
      return null;
    }

    return this.occupancy[row][col];
  }

  canPlacePiece(piece: CompiledPieceData, row: number, col: number, ignorePieceId?: string): boolean {
    for (const cell of piece.localCells) {
      const targetRow = row + cell.row;
      const targetCol = col + cell.col;

      if (
        targetRow < 0 ||
        targetRow >= this.level.grid.rows ||
        targetCol < 0 ||
        targetCol >= this.level.grid.cols
      ) {
        return false;
      }

      const occupant = this.occupancy[targetRow][targetCol];

      if (occupant && occupant !== ignorePieceId) {
        return false;
      }
    }

    return true;
  }

  getMovementRanges(pieceId: string): { horizontal: AxisRange; vertical: AxisRange } {
    const piece = this.getPiece(pieceId);

    return {
      horizontal: this.computeAxisRange(piece, 0, 1),
      vertical: this.computeAxisRange(piece, 1, 0),
    };
  }

  countSolvedPieces(): number {
    const solvedDelta = this.computeSolvedTranslation();

    if (!solvedDelta) {
      return 0;
    }

    return this.getPieces().filter((piece) => this.isPieceSolved(piece, solvedDelta)).length;
  }

  isSolved(): boolean {
    const solvedDelta = this.computeSolvedTranslation();
    return solvedDelta ? this.getPieces().every((piece) => this.isPieceSolved(piece, solvedDelta)) : false;
  }

  getSolvedTranslation(): GridCoord | null {
    return this.computeSolvedTranslation();
  }

  getPieceCells(pieceId: string): GridCoord[] {
    const piece = this.getPiece(pieceId);
    return piece.data.localCells.map((cell) => ({
      row: piece.row + cell.row,
      col: piece.col + cell.col,
    }));
  }

  private computeAxisRange(piece: PieceState, rowStep: number, colStep: number): AxisRange {
    let min = 0;
    let max = 0;

    while (this.canPlacePiece(piece.data, piece.row + rowStep * (min - 1), piece.col + colStep * (min - 1), piece.data.id)) {
      min -= 1;
    }

    while (this.canPlacePiece(piece.data, piece.row + rowStep * (max + 1), piece.col + colStep * (max + 1), piece.data.id)) {
      max += 1;
    }

    return { min, max };
  }

  private computeSolvedTranslation(): GridCoord | null {
    const pieces = this.getPieces();

    if (pieces.length === 0) {
      return null;
    }

    const firstPiece = pieces[0];

    return {
      row: firstPiece.row - firstPiece.data.solvedOrigin.row,
      col: firstPiece.col - firstPiece.data.solvedOrigin.col,
    };
  }

  private isPieceSolved(piece: PieceState, translation: GridCoord): boolean {
    return (
      piece.row === piece.data.solvedOrigin.row + translation.row &&
      piece.col === piece.data.solvedOrigin.col + translation.col
    );
  }

  private rebuildOccupancy(): void {
    for (const row of this.occupancy) {
      row.fill(null);
    }

    for (const piece of this.pieces.values()) {
      for (const cell of piece.data.localCells) {
        this.occupancy[piece.row + cell.row][piece.col + cell.col] = piece.data.id;
      }
    }
  }
}
