import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_PIECE_THICKNESS,
  cellKey,
  getPieceBounds,
  isWholeNumber,
  translateCells,
  tupleToCoord,
} from '@shared/grid';
import type {
  CellTuple,
  CompiledLevelData,
  CompiledPieceData,
  GridCoord,
} from '@shared/puzzle';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, '../..');
const levelsDir = path.join(rootDir, 'assets/data/levels');
const imagesDir = path.join(rootDir, 'assets/images/levels');
const outputFile = path.join(rootDir, 'game/src/generated/levelBank.ts');
let availableImageFiles: string[] | undefined;

async function main(): Promise<void> {
  availableImageFiles = (await fs.readdir(imagesDir))
    .filter((filename) => !filename.startsWith('.'))
    .sort((left, right) => left.localeCompare(right));

  const filenames = (await fs.readdir(levelsDir))
    .filter((filename) => filename.endsWith('.json'))
    .sort((left, right) => left.localeCompare(right));

  if (filenames.length === 0) {
    throw new Error(`No level JSON files were found in ${levelsDir}.`);
  }

  const levels: CompiledLevelData[] = [];
  const imageImports = new Map<string, string>();

  for (const filename of filenames) {
    const filePath = path.join(levelsDir, filename);
    const rawText = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(rawText) as unknown;
    const level = compileLevel(parsed, filename);

    const importName = toImportName(level.image);
    imageImports.set(level.image, importName);
    levels.push({
      ...level,
      imageKey: `level-image:${level.id}`,
    });
  }

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, renderModule(levels, imageImports), 'utf8');
  console.log(`Compiled ${levels.length} level(s) to ${outputFile}`);
}

function compileLevel(input: unknown, filename: string): CompiledLevelData {
  if (!isRecord(input)) {
    throw new Error(`${filename}: top-level JSON must be an object.`);
  }

  const id = readString(input.id, `${filename}: "id"`);
  const image = resolveImageFile(readString(input.image, `${filename}: "image"`), filename);
  const grid = readGrid(input.grid, filename);
  const pieceInputs = readArray(input.pieces, `${filename}: "pieces"`);

  if (pieceInputs.length === 0) {
    throw new Error(`${filename}: at least one piece is required.`);
  }

  const pieces: CompiledPieceData[] = [];
  const solvedOccupancy = new Map<string, string>();
  const startOccupancy = new Map<string, string>();
  const pieceIds = new Set<string>();
  const solvedCellsForBounds: GridCoord[] = [];
  let solvedCellCount = 0;

  for (const pieceInput of pieceInputs) {
    const piece = compilePiece(pieceInput, filename, grid.rows, grid.cols);

    if (pieceIds.has(piece.id)) {
      throw new Error(`${filename}: duplicate piece id "${piece.id}".`);
    }

    pieceIds.add(piece.id);
    solvedCellCount += piece.solvedCells.length;

    for (const cell of piece.solvedCells) {
      const key = cellKey(cell.row, cell.col);
      const owner = solvedOccupancy.get(key);

      if (owner) {
        throw new Error(`${filename}: solved overlap at ${key} between "${owner}" and "${piece.id}".`);
      }

      solvedOccupancy.set(key, piece.id);
      solvedCellsForBounds.push(cell);
    }

    for (const cell of piece.startCells) {
      const key = cellKey(cell.row, cell.col);
      const owner = startOccupancy.get(key);

      if (owner) {
        throw new Error(`${filename}: start overlap at ${key} between "${owner}" and "${piece.id}".`);
      }

      startOccupancy.set(key, piece.id);
    }

    pieces.push(piece);
  }

  const solvedBounds = getPieceBounds(solvedCellsForBounds);

  return {
    id,
    image,
    imageKey: '',
    grid,
    pieces,
    solvedBounds,
    solvedCellCount,
  };
}

function compilePiece(input: unknown, filename: string, rowLimit: number, colLimit: number): CompiledPieceData {
  if (!isRecord(input)) {
    throw new Error(`${filename}: each piece must be an object.`);
  }

  const id = readString(input.id, `${filename}: piece "id"`);
  const cells = readCellTupleArray(input.cells, `${filename}: piece "${id}" cells`);
  const solvedOrigin = readCellTuple(input.solvedOrigin, `${filename}: piece "${id}" solvedOrigin`);
  const startOrigin = readCellTuple(input.startOrigin, `${filename}: piece "${id}" startOrigin`);
  const thickness = input.thickness === undefined
    ? DEFAULT_PIECE_THICKNESS
    : readWholeNumber(input.thickness, `${filename}: piece "${id}" thickness`);

  if (thickness < 8 || thickness > 36) {
    throw new Error(`${filename}: piece "${id}" thickness must be between 8 and 36.`);
  }

  const localCells = cells.map(tupleToCoord);
  const localKeys = new Set<string>();

  for (const cell of localCells) {
    const key = cellKey(cell.row, cell.col);

    if (localKeys.has(key)) {
      throw new Error(`${filename}: piece "${id}" contains duplicate local cell ${key}.`);
    }

    if (cell.row < 0 || cell.col < 0) {
      throw new Error(`${filename}: piece "${id}" contains negative local cell ${key}.`);
    }

    localKeys.add(key);
  }

  const bounds = getPieceBounds(localCells);
  const normalizedCells = localCells.map((cell) => ({
    row: cell.row - bounds.minRow,
    col: cell.col - bounds.minCol,
  }));
  const normalizedTuples = normalizedCells.map(toTuple);

  const solvedOriginCoord = {
    row: solvedOrigin[0] + bounds.minRow,
    col: solvedOrigin[1] + bounds.minCol,
  };
  const startOriginCoord = {
    row: startOrigin[0] + bounds.minRow,
    col: startOrigin[1] + bounds.minCol,
  };

  const solvedCells = translateCells(normalizedCells, solvedOriginCoord);
  const startCells = translateCells(normalizedCells, startOriginCoord);

  validateWithinGrid(solvedCells, rowLimit, colLimit, `${filename}: piece "${id}" solved placement`);
  validateWithinGrid(startCells, rowLimit, colLimit, `${filename}: piece "${id}" start placement`);

  return {
    id,
    thickness,
    bounds: {
      minRow: 0,
      minCol: 0,
      maxRow: bounds.height - 1,
      maxCol: bounds.width - 1,
      width: bounds.width,
      height: bounds.height,
    },
    cells: normalizedTuples,
    localCells: normalizedCells,
    solvedOrigin: solvedOriginCoord,
    startOrigin: startOriginCoord,
    solvedCells,
    startCells,
    width: bounds.width,
    height: bounds.height,
  };
}

function validateWithinGrid(cells: GridCoord[], rowLimit: number, colLimit: number, label: string): void {
  for (const cell of cells) {
    if (cell.row < 0 || cell.row >= rowLimit || cell.col < 0 || cell.col >= colLimit) {
      throw new Error(`${label} falls outside the ${rowLimit}x${colLimit} board at ${cellKey(cell.row, cell.col)}.`);
    }
  }
}

function renderModule(levels: CompiledLevelData[], imageImports: Map<string, string>): string {
  const importLines = Array.from(imageImports.entries()).map(
    ([image, importName]) => `import ${importName} from '../../../assets/images/levels/${image}';`,
  );

  const manifestEntries = Array.from(imageImports.entries()).map(
    ([image, importName]) => `  '${image}': ${importName},`,
  );

  const serialized = JSON.stringify(levels, null, 2);

  return `${importLines.join('\n')}
import type { CompiledLevelData } from '@shared/puzzle';

export const levelImageManifest = {
${manifestEntries.join('\n')}
} as const;

export const levelBank = ${serialized} satisfies CompiledLevelData[];

export function getCompiledLevel(levelId: string): CompiledLevelData {
  const level = levelBank.find((entry) => entry.id === levelId);

  if (!level) {
    throw new Error(\`Unknown compiled level: \${levelId}\`);
  }

  return level;
}
`;
}

function resolveImageFile(imageInput: string, filename: string): string {
  const images = getAvailableImageFiles();

  if (images.includes(imageInput)) {
    return imageInput;
  }

  const matches = images.filter((image) => image === imageInput || image.startsWith(`${imageInput}.`));

  if (matches.length === 1) {
    return matches[0];
  }

  if (matches.length > 1) {
    throw new Error(
      `${filename}: image "${imageInput}" is ambiguous in ${imagesDir}. Use one of: ${matches.join(', ')}.`,
    );
  }

  throw new Error(`${filename}: image "${imageInput}" was not found in ${imagesDir}.`);
}

function getAvailableImageFiles(): string[] {
  if (!availableImageFiles) {
    throw new Error('Image file list was not initialized.');
  }

  return availableImageFiles;
}

function readGrid(input: unknown, filename: string): { rows: number; cols: number } {
  if (!isRecord(input)) {
    throw new Error(`${filename}: "grid" must be an object.`);
  }

  const rows = readWholeNumber(input.rows, `${filename}: grid.rows`);
  const cols = readWholeNumber(input.cols, `${filename}: grid.cols`);

  if (rows < 2 || cols < 2) {
    throw new Error(`${filename}: grid rows and cols must both be at least 2.`);
  }

  return { rows, cols };
}

function readCellTupleArray(input: unknown, label: string): CellTuple[] {
  const tuples = readArray(input, label);

  if (tuples.length === 0) {
    throw new Error(`${label} must contain at least one cell.`);
  }

  return tuples.map((tuple, index) => readCellTuple(tuple, `${label}[${index}]`));
}

function readCellTuple(input: unknown, label: string): CellTuple {
  if (!Array.isArray(input) || input.length !== 2) {
    throw new Error(`${label} must be a [row, col] tuple.`);
  }

  const row = readWholeNumber(input[0], `${label}[0]`);
  const col = readWholeNumber(input[1], `${label}[1]`);
  return [row, col];
}

function readWholeNumber(input: unknown, label: string): number {
  if (!isWholeNumber(input)) {
    throw new Error(`${label} must be a whole number.`);
  }

  return input;
}

function readString(input: unknown, label: string): string {
  if (typeof input !== 'string' || input.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }

  return input.trim();
}

function readArray(input: unknown, label: string): unknown[] {
  if (!Array.isArray(input)) {
    throw new Error(`${label} must be an array.`);
  }

  return input;
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
}

function toTuple(coord: GridCoord): CellTuple {
  return [coord.row, coord.col];
}

function toImportName(image: string): string {
  return image
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, character: string) => character.toUpperCase())
    .replace(/^[^a-zA-Z]+/, 'levelImage')
    .replace(/[^a-zA-Z0-9]/g, '');
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
