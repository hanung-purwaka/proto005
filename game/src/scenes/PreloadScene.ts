import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@game/game/constants';
import { UI_TEXTURE_KEYS, UI_TEXTURE_SIZES } from '@game/game/uiAssets';
import { levelBank, levelImageManifest } from '@game/generated/levelBank';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#f4ebd7');

    const card = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, UI_TEXTURE_KEYS.preloadCard);
    card.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.preloadCard].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.preloadCard].height,
    );

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 48, 'Loading Picture Blocks', {
      fontFamily: 'Trebuchet MS',
      fontSize: '32px',
      color: '#5f4832',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 6, 'Preparing chunky image pieces...', {
      fontFamily: 'Trebuchet MS',
      fontSize: '18px',
      color: '#7a6551',
    }).setOrigin(0.5);

    const progressTrack = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 54, UI_TEXTURE_KEYS.progressTrack);
    const progressFill = this.add.image(
      progressTrack.x - UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.progressFill].width / 2,
      progressTrack.y,
      UI_TEXTURE_KEYS.progressFill,
    );
    progressFill.setOrigin(0, 0.5);
    progressFill.setCrop(0, 0, 0, UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.progressFill].height);

    this.load.on('progress', (value: number) => {
      progressFill.setCrop(
        0,
        0,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.progressFill].width * value,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.progressFill].height,
      );
    });

    this.load.once('complete', () => {
      this.scene.start('game', { levelId: levelBank[0]?.id ?? 'sample-bloom' });
    });

    for (const level of levelBank) {
      const imageUrl = levelImageManifest[level.image as keyof typeof levelImageManifest];
      this.load.image(level.imageKey, imageUrl);
    }

    this.load.start();
  }
}
