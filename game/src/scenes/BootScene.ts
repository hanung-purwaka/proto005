import Phaser from 'phaser';
import { UI_TEXTURE_KEYS, UI_TEXTURE_SIZES, uiImageManifest } from '@game/game/uiAssets';

const BUTTON_FILL = 0xe1c08d;
const BUTTON_STROKE = 0x7c5f3c;
const BUTTON_STROKE_WIDTH = 3;
const TIMER_FILL = 0xebdfc7;
const TIMER_RADIUS = 18;
const MODAL_FILL = 0xf4e7cb;
const MODAL_STROKE = 0xd7be92;
const MODAL_STROKE_WIDTH = 3;
const MODAL_RADIUS = 26;
const RESTART_STROKE = 0x6a5035;
const RESTART_STROKE_WIDTH = 4;

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
    this.createTimerPillTexture(
      UI_TEXTURE_KEYS.timerPill,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.timerPill].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.timerPill].height,
    );
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
    this.createModalPanelTexture(
      UI_TEXTURE_KEYS.modalPanel,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.modalPanel].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.modalPanel].height,
    );
    this.createRestartIconTexture(
      UI_TEXTURE_KEYS.resetIcon,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.resetIcon].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.resetIcon].height,
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

  private createTimerPillTexture(key: string, width: number, height: number): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false);

    graphics.fillStyle(TIMER_FILL, 1);
    graphics.fillRoundedRect(0, 0, width, height, TIMER_RADIUS);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  private createModalPanelTexture(key: string, width: number, height: number): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false);
    const inset = MODAL_STROKE_WIDTH / 2;

    graphics.fillStyle(0x000000, 0.08);
    graphics.fillRoundedRect(0, 10, width, height - 10, MODAL_RADIUS);
    graphics.fillStyle(MODAL_FILL, 1);
    graphics.fillRoundedRect(0, 0, width, height - 10, MODAL_RADIUS);
    graphics.lineStyle(MODAL_STROKE_WIDTH, MODAL_STROKE, 1);
    graphics.strokeRoundedRect(inset, inset, width - MODAL_STROKE_WIDTH, height - 10 - MODAL_STROKE_WIDTH, MODAL_RADIUS);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  private createRestartIconTexture(key: string, width: number, height: number): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.28;

    graphics.lineStyle(RESTART_STROKE_WIDTH, RESTART_STROKE, 1);
    graphics.beginPath();
    graphics.arc(centerX, centerY, radius, Phaser.Math.DegToRad(42), Phaser.Math.DegToRad(318), false);
    graphics.strokePath();

    const tipX = centerX + Math.cos(Phaser.Math.DegToRad(42)) * radius;
    const tipY = centerY + Math.sin(Phaser.Math.DegToRad(42)) * radius;
    const arrowLength = 8;
    const leftAngle = Phaser.Math.DegToRad(168);
    const rightAngle = Phaser.Math.DegToRad(104);

    graphics.beginPath();
    graphics.moveTo(tipX, tipY);
    graphics.lineTo(
      tipX + Math.cos(leftAngle) * arrowLength,
      tipY + Math.sin(leftAngle) * arrowLength,
    );
    graphics.moveTo(tipX, tipY);
    graphics.lineTo(
      tipX + Math.cos(rightAngle) * arrowLength,
      tipY + Math.sin(rightAngle) * arrowLength,
    );
    graphics.strokePath();

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }
}
