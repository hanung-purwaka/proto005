export interface GridCoord {
  row: number;
  col: number;
}

export interface GridSize {
  rows: number;
  cols: number;
}

export type CellTuple = [number, number];

export interface PieceBounds {
  minRow: number;
  minCol: number;
  maxRow: number;
  maxCol: number;
  width: number;
  height: number;
}

export interface PieceVisualMaskSource {
  resolution: number;
  cells: CellTuple[];
}

export interface PieceSource {
  id: string;
  cells: CellTuple[];
  solvedOrigin: CellTuple;
  startOrigin: CellTuple;
  thickness?: number;
  visualMask?: PieceVisualMaskSource;
}

export interface SourceLevelDefinition {
  id: string;
  image: string;
  grid: GridSize;
  pieces: PieceSource[];
}

export interface CompiledPieceData {
  id: string;
  thickness: number;
  bounds: PieceBounds;
  cells: CellTuple[];
  localCells: GridCoord[];
  solvedOrigin: GridCoord;
  startOrigin: GridCoord;
  solvedCells: GridCoord[];
  startCells: GridCoord[];
  width: number;
  height: number;
}

export interface CompiledLevelData {
  id: string;
  image: string;
  imageKey: string;
  grid: GridSize;
  pieces: CompiledPieceData[];
  solvedBounds: PieceBounds;
  solvedCellCount: number;
}
