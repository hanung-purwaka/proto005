import Phaser from 'phaser';
import { UI_TEXTURE_KEYS, UI_TEXTURE_SIZES, uiImageManifest } from '@game/game/uiAssets';

const BUTTON_FILL = 0xe1c08d;
const BUTTON_STROKE = 0x7c5f3c;
const BUTTON_STROKE_WIDTH = 3;

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload(): void {
    for (const [key, url] of Object.entries(uiImageManifest)) {
      this.load.image(key, url);
    }
  }

  create(): void {
    this.createFlatButtonTexture(
      UI_TEXTURE_KEYS.buttonSquare,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].height,
    );
    this.createFlatButtonTexture(
      UI_TEXTURE_KEYS.buttonWide,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].height,
    );
    this.scene.start('preload');
  }

  private createFlatButtonTexture(key: string, width: number, height: number): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false);
    const inset = BUTTON_STROKE_WIDTH / 2;

    graphics.fillStyle(BUTTON_FILL, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.lineStyle(BUTTON_STROKE_WIDTH, BUTTON_STROKE, 1);
    graphics.strokeRect(inset, inset, width - BUTTON_STROKE_WIDTH, height - BUTTON_STROKE_WIDTH);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }
}
