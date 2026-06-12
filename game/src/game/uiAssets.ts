export const UI_TEXTURE_KEYS = {
  preloadCard: 'ui-preload-card',
  progressTrack: 'ui-progress-track',
  progressFill: 'ui-progress-fill',
  timerPill: 'ui-timer-pill',
  buttonSquare: 'ui-button-square',
  buttonWide: 'ui-button-wide',
  modalPanel: 'ui-modal-panel',
  resetIcon: 'ui-reset-icon',
} as const;

export const uiImageManifest: Record<string, string> = {
  [UI_TEXTURE_KEYS.preloadCard]: '/ui/preload-card.png',
  [UI_TEXTURE_KEYS.progressTrack]: '/ui/progress-track.png',
  [UI_TEXTURE_KEYS.progressFill]: '/ui/progress-fill.png',
  [UI_TEXTURE_KEYS.timerPill]: '/ui/timer-pill.png',
  [UI_TEXTURE_KEYS.modalPanel]: '/ui/modal-panel.png',
  [UI_TEXTURE_KEYS.resetIcon]: '/ui/reset-icon.png',
};

export const UI_TEXTURE_SIZES = {
  [UI_TEXTURE_KEYS.preloadCard]: { width: 420, height: 220 },
  [UI_TEXTURE_KEYS.progressTrack]: { width: 292, height: 16 },
  [UI_TEXTURE_KEYS.progressFill]: { width: 288, height: 10 },
  [UI_TEXTURE_KEYS.timerPill]: { width: 184, height: 60 },
  [UI_TEXTURE_KEYS.buttonSquare]: { width: 56, height: 60 },
  [UI_TEXTURE_KEYS.buttonWide]: { width: 168, height: 56 },
  [UI_TEXTURE_KEYS.modalPanel]: { width: 312, height: 196 },
  [UI_TEXTURE_KEYS.resetIcon]: { width: 30, height: 30 },
} as const;
