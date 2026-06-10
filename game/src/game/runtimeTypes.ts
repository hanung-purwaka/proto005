import type { CompiledLevelData, CompiledPieceData } from '@shared/puzzle';

export interface AxisRange {
  min: number;
  max: number;
}

export type DragAxis = 'horizontal' | 'vertical';

export interface PieceState {
  data: CompiledPieceData;
  row: number;
  col: number;
}

export interface DragState {
  pieceId: string;
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startRow: number;
  startCol: number;
  horizontalRange: AxisRange;
  verticalRange: AxisRange;
  previewDelta: number;
  axis?: DragAxis;
}

export interface BoardMetrics {
  cellSize: number;
  boardWidth: number;
  boardHeight: number;
  originX: number;
  originY: number;
}

export interface LevelSession {
  level: CompiledLevelData;
  levelNumber: number;
  moves: number;
  timeRemaining: number;
}
