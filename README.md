# Proto005

`proto005` is a Vite + Phaser + TypeScript prototype for an image-based sliding polyomino puzzle. The runtime game lives in `game/`, source assets live in shared root folders, and a compile step turns human-editable level JSON into normalized runtime data under `game/src/generated/`.

## Folder structure

- `game/`
  The runnable Phaser app, Vite config, compile script entry, and generated runtime level bank.
- `shared/`
  Reusable TypeScript definitions and grid helpers intended to be shared later with tooling.
- `assets/images/levels/`
  Source artwork for puzzle levels.
- `assets/data/levels/`
  Human-editable source level JSON files.
- `game/src/generated/`
  Generated runtime-ready level data. Do not hand-edit this folder.

## Source assets vs generated data

- Source level JSON is authoritative for grid size, piece shapes, solved layout, and starting layout.
- Source images are artwork only. The runtime crops them according to the JSON-defined piece cells.
- The compile step validates the JSON and emits normalized piece bounds, solved cells, start cells, and runtime image keys into `game/src/generated/levelBank.ts`.

## Level JSON format

Each level file in `assets/data/levels/` uses this shape:

```json
{
  "id": "sample-bloom",
  "image": "sample-bloom.svg",
  "grid": { "rows": 6, "cols": 6 },
  "pieces": [
    {
      "id": "petal-a",
      "cells": [[0, 0], [0, 1], [1, 0]],
      "solvedOrigin": [1, 1],
      "startOrigin": [0, 0],
      "thickness": 18
    }
  ]
}
```

Each piece uses:

- `id: string`
- `cells: Array<[row, col]>`
- `solvedOrigin: [row, col]`
- `startOrigin: [row, col]`
- `thickness?: number`

## Compile flow

Run the compiler from `game/`:

```bash
npm run compile-levels
```

The compiler:

- Reads all JSON files in `../assets/data/levels/`
- Validates required fields
- Validates unique local cells within each piece
- Validates solved placements fit the board
- Validates solved overlaps across pieces
- Validates start placements and start overlaps
- Computes normalized bounds and precomputed cell lists
- Emits `src/generated/levelBank.ts`

## Run and build

From `proto005/game`:

```bash
npm install
npm run dev
npm run build
```

Useful extra check:

```bash
npm run typecheck
```

## Future tooling support

This structure separates source-of-truth content from runtime output so future tools can reuse:

- Shared JSON and compiled TypeScript contracts from `shared/`
- Source images from `assets/images/levels/`
- Source level definitions from `assets/data/levels/`
- Generated runtime level data from `game/src/generated/`

That lets future tooling add importers, validators, or editors later without changing the runtime contract used by the browser game today.
