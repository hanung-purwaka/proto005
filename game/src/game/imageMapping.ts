import type { CompiledLevelData, GridCoord } from '@shared/puzzle';

export interface SourceCropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CroppedImagePlacement {
  x: number;
  y: number;
  displayWidth: number;
  displayHeight: number;
}

export function getSourceCellCrop(
  level: CompiledLevelData,
  sourceWidth: number,
  sourceHeight: number,
  solvedCell: GridCoord,
): SourceCropRect {
  const solvedBounds = level.solvedBounds;
  const sourceCellWidth = sourceWidth / solvedBounds.width;
  const sourceCellHeight = sourceHeight / solvedBounds.height;
  const relativeCol = solvedCell.col - solvedBounds.minCol;
  const relativeRow = solvedCell.row - solvedBounds.minRow;

  return {
    x: relativeCol * sourceCellWidth,
    y: relativeRow * sourceCellHeight,
    width: sourceCellWidth,
    height: sourceCellHeight,
  };
}

export function getCroppedImagePlacement(
  crop: SourceCropRect,
  sourceWidth: number,
  sourceHeight: number,
  targetX: number,
  targetY: number,
  targetWidth: number,
  targetHeight: number,
): CroppedImagePlacement {
  const displayWidth = targetWidth * (sourceWidth / crop.width);
  const displayHeight = targetHeight * (sourceHeight / crop.height);

  return {
    x: targetX - displayWidth * (crop.x / sourceWidth),
    y: targetY - displayHeight * (crop.y / sourceHeight),
    displayWidth,
    displayHeight,
  };
}
