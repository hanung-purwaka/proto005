import Phaser from 'phaser';
import { uiImageManifest } from '@game/game/uiAssets';

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
    this.scene.start('preload');
  }
}
