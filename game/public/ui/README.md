Runtime UI PNG placeholders live in this folder.

Replace these files with your final exported assets using the same filenames:

- `preload-card.png`
- `progress-track.png`
- `progress-fill.png`

Notes:

- Keep the canvas size of each replacement the same unless you also update [uiAssets.ts](/Users/hanung.purwaka/Documents/GitHub/00%20Game%20Prototype/proto005/game/src/game/uiAssets.ts).
- These files are served directly from Vite `public/`, so no import step is required.
- `BootScene` loads them before runtime scenes start.
- `timer-pill`, `button-square`, `button-wide`, `modal-panel`, and `reset-icon` are generated at runtime in [BootScene.ts](/Users/hanung.purwaka/Documents/GitHub/00%20Game%20Prototype/proto005/game/src/scenes/BootScene.ts).
- Shadows and transparent margins can be baked directly into the PNGs.
