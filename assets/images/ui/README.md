UI PNG placeholders live in this folder.

Replace these files with your final exported assets using the same filenames:

- `preload-card.png`
- `progress-track.png`
- `progress-fill.png`
- `timer-pill.png`
- `button-square.png`
- `button-wide.png`
- `modal-panel.png`
- `reset-icon.png`

Notes:

- Keep the canvas size of each replacement the same unless you also update [uiAssets.ts](/Users/hanung.purwaka/Documents/GitHub/00%20Game%20Prototype/proto005/game/src/game/uiAssets.ts).
- These PNGs are loaded by `BootScene` before runtime scenes start.
- Shadows and transparent margins can be baked directly into the PNGs.
