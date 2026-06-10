import Phaser from 'phaser';
import { levelBank } from '@game/generated/levelBank';
import {
  BOARD_MAX_SIZE,
  BOARD_TOP,
  DRAG_LOCK_THRESHOLD,
  GAME_HEIGHT,
  GAME_WIDTH,
  HEADER_Y,
  SNAP_TWEEN_MS,
} from '@game/game/constants';
import { PIECE_FACE_INSET, PIECE_FACE_RADIUS, PieceView } from '@game/game/pieceView';
import { PuzzleBoard } from '@game/game/puzzleBoard';
import { UI_TEXTURE_KEYS, UI_TEXTURE_SIZES } from '@game/game/uiAssets';
import type { BoardMetrics, DragAxis, DragState, LevelSession } from '@game/game/runtimeTypes';
import type { CompiledLevelData } from '@shared/puzzle';

type SceneInitData = { levelId?: string };
type ResultState = 'win' | 'lose';
type RevealCell = { boardRow: number; boardCol: number };

export class GameScene extends Phaser.Scene {
  private board!: PuzzleBoard;
  private boardMetrics!: BoardMetrics;
  private session!: LevelSession;
  private pieceViews = new Map<string, PieceView>();
  private dragState?: DragState;
  private levelText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private movesText!: Phaser.GameObjects.Text;
  private timerEvent?: Phaser.Time.TimerEvent;
  private resultOverlay?: Phaser.GameObjects.Container;
  private solvedReveal?: Phaser.GameObjects.Container;
  private finishedResult?: ResultState;

  constructor() {
    super('game');
  }

  init(data?: SceneInitData): void {
    const level = this.resolveLevel(data?.levelId);

    this.session = {
      level,
      levelNumber: Math.max(1, levelBank.findIndex((entry) => entry.id === level.id) + 1),
      moves: 0,
      timeRemaining: 4 * 60 + 57,
    };
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#f3ead4');
    this.resultOverlay = undefined;
    this.solvedReveal = undefined;
    this.finishedResult = undefined;
    this.dragState = undefined;
    this.board = new PuzzleBoard(this.session.level);
    this.boardMetrics = this.getBoardMetrics(this.session.level);
    this.pieceViews.clear();
    this.timerEvent?.remove(false);

    this.buildBackdrop();
    this.buildHeader();
    this.buildBoard();
    this.buildPieces();
    this.refreshPieceSurfaces();
    this.registerInput();
    this.startTimer();
    this.updateHud();
  }

  private resolveLevel(levelId?: string): CompiledLevelData {
    if (!levelId) {
      return levelBank[0];
    }

    return levelBank.find((level) => level.id === levelId) ?? levelBank[0];
  }

  private getBoardMetrics(level: CompiledLevelData): BoardMetrics {
    const cellSize = Math.floor(Math.min(BOARD_MAX_SIZE / level.grid.cols, BOARD_MAX_SIZE / level.grid.rows));
    const boardWidth = cellSize * level.grid.cols;
    const boardHeight = cellSize * level.grid.rows;

    return {
      cellSize,
      boardWidth,
      boardHeight,
      originX: (GAME_WIDTH - boardWidth) / 2,
      originY: BOARD_TOP,
    };
  }

  private buildBackdrop(): void {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xf3ead4);

    const wash = this.add.graphics();
    wash.fillGradientStyle(0xf8f1df, 0xf8f1df, 0xf0e2c2, 0xf0e2c2, 1, 1, 1, 1);
    wash.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    wash.fillStyle(0xffffff, 0.18);
    wash.fillCircle(84, 104, 54);
    wash.fillCircle(472, 822, 66);
  }

  private buildHeader(): void {
    this.levelText = this.add.text(GAME_WIDTH / 2, HEADER_Y, `LEVEL ${this.session.levelNumber}`, {
      fontFamily: 'Trebuchet MS',
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#5b4634',
      align: 'center',
    }).setOrigin(0.5);

    const timerPanel = this.add.image(GAME_WIDTH / 2, 130, UI_TEXTURE_KEYS.timerPill);
    timerPanel.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.timerPill].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.timerPill].height,
    );

    this.timerText = this.add.text(GAME_WIDTH / 2, 126, '', {
      fontFamily: 'Trebuchet MS',
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#4f4030',
    }).setOrigin(0.5);

    const resetButton = this.buildIconButton(GAME_WIDTH - 64, 122, () => {
      this.scene.restart({ levelId: this.session.level.id });
    });
    resetButton.setDepth(10);

    this.movesText = this.add.text(GAME_WIDTH / 2, 176, '', {
      fontFamily: 'Trebuchet MS',
      fontSize: '18px',
      color: '#8d7961',
    }).setOrigin(0.5);
  }

  private buildBoard(): void {
    const { originX, originY, boardWidth, boardHeight, cellSize } = this.boardMetrics;

    const grid = this.add.graphics();

    for (let row = 0; row < this.session.level.grid.rows; row += 1) {
      for (let col = 0; col < this.session.level.grid.cols; col += 1) {
        const x = originX + col * cellSize;
        const y = originY + row * cellSize;
        grid.fillStyle(0xe4d8be, 0.86);
        grid.fillRoundedRect(x + 4, y + 4, cellSize - 8, cellSize - 8, 12);
      }
    }

    const frame = this.add.graphics();
    frame.lineStyle(2, 0xe9dbc0, 0.5);
    frame.strokeRoundedRect(originX - 6, originY - 6, boardWidth + 12, boardHeight + 12, 18);
  }

  private buildPieces(): void {
    const { originX, originY, cellSize } = this.boardMetrics;

    for (const pieceState of this.board.getPieces()) {
      const view = new PieceView(
        this,
        this.session.level,
        pieceState.data,
        this.session.level.imageKey,
        cellSize,
      );

      view.setGridPosition(
        originX + pieceState.col * cellSize,
        originY + pieceState.row * cellSize,
      );
      view.container.setDepth(12);

      this.pieceViews.set(pieceState.data.id, view);
    }
  }

  private refreshPieceSurfaces(): void {
    for (const pieceState of this.board.getPieces()) {
      const view = this.pieceViews.get(pieceState.data.id);

      if (!view) {
        continue;
      }

      view.refreshSurface(pieceState.row, pieceState.col, (row, col) => this.board.getOccupant(row, col));
    }
  }

  private registerInput(): void {
    this.input.on('gameobjectdown', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      const entry = Array.from(this.pieceViews.entries()).find(([, view]) => view.container === gameObject);

      if (!entry || this.finishedResult || this.dragState) {
        return;
      }

      const [pieceId, view] = entry;
      const piece = this.board.getPiece(pieceId);
      const ranges = this.board.getMovementRanges(pieceId);

      if (
        ranges.horizontal.min === 0 &&
        ranges.horizontal.max === 0 &&
        ranges.vertical.min === 0 &&
        ranges.vertical.max === 0
      ) {
        return;
      }

      this.dragState = {
        pieceId,
        pointerId: pointer.id,
        startPointerX: pointer.x,
        startPointerY: pointer.y,
        startRow: piece.row,
        startCol: piece.col,
        horizontalRange: ranges.horizontal,
        verticalRange: ranges.vertical,
        previewDelta: 0,
      };

      view.setDragging(true);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.dragState || this.dragState.pointerId !== pointer.id) {
        return;
      }

      const dx = pointer.x - this.dragState.startPointerX;
      const dy = pointer.y - this.dragState.startPointerY;

      if (!this.dragState.axis) {
        const canMoveHorizontal =
          this.dragState.horizontalRange.min !== 0 || this.dragState.horizontalRange.max !== 0;
        const canMoveVertical =
          this.dragState.verticalRange.min !== 0 || this.dragState.verticalRange.max !== 0;

        if (Math.max(Math.abs(dx), Math.abs(dy)) < DRAG_LOCK_THRESHOLD) {
          return;
        }

        if (canMoveHorizontal && !canMoveVertical) {
          this.dragState.axis = 'horizontal';
        } else if (!canMoveHorizontal && canMoveVertical) {
          this.dragState.axis = 'vertical';
        } else {
          this.dragState.axis = Math.abs(dx) >= Math.abs(dy) ? 'horizontal' : 'vertical';
        }
      }

      this.dragState.previewDelta = this.clampPreviewDelta(this.dragState.axis, dx, dy, this.dragState);
      this.updateDraggedView();
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!this.dragState || this.dragState.pointerId !== pointer.id) {
        return;
      }

      this.commitDrag();
    });
  }

  private clampPreviewDelta(axis: DragAxis, dx: number, dy: number, dragState: DragState): number {
    const raw = axis === 'horizontal' ? dx / this.boardMetrics.cellSize : dy / this.boardMetrics.cellSize;
    const range = axis === 'horizontal' ? dragState.horizontalRange : dragState.verticalRange;
    return Phaser.Math.Clamp(raw, range.min, range.max);
  }

  private updateDraggedView(): void {
    if (!this.dragState) {
      return;
    }

    const piece = this.board.getPiece(this.dragState.pieceId);
    const view = this.pieceViews.get(this.dragState.pieceId);

    if (!view) {
      return;
    }

    view.setPreviewPosition(
      this.boardMetrics.originX + piece.col * this.boardMetrics.cellSize,
      this.boardMetrics.originY + piece.row * this.boardMetrics.cellSize,
      this.dragState.axis,
      this.dragState.previewDelta,
    );
  }

  private commitDrag(): void {
    if (!this.dragState) {
      return;
    }

    const dragState = this.dragState;
    const piece = this.board.getPiece(dragState.pieceId);
    const view = this.pieceViews.get(dragState.pieceId);
    this.dragState = undefined;

    if (!view) {
      return;
    }

    view.setDragging(false);

    if (!dragState.axis) {
      view.tweenTo(
        this.boardMetrics.originX + piece.col * this.boardMetrics.cellSize,
        this.boardMetrics.originY + piece.row * this.boardMetrics.cellSize,
        SNAP_TWEEN_MS,
      );
      return;
    }

    const snappedDelta = Phaser.Math.Clamp(
      Math.round(dragState.previewDelta),
      dragState.axis === 'horizontal' ? dragState.horizontalRange.min : dragState.verticalRange.min,
      dragState.axis === 'horizontal' ? dragState.horizontalRange.max : dragState.verticalRange.max,
    );

    const nextRow = dragState.axis === 'vertical' ? dragState.startRow + snappedDelta : dragState.startRow;
    const nextCol = dragState.axis === 'horizontal' ? dragState.startCol + snappedDelta : dragState.startCol;
    const moved = nextRow !== dragState.startRow || nextCol !== dragState.startCol;

    this.board.movePiece(dragState.pieceId, nextRow, nextCol);
    this.refreshPieceSurfaces();
    const solvedNow = this.board.isSolved() && this.session.timeRemaining > 0;

    if (solvedNow) {
      this.timerEvent?.remove(false);
    }

    view.tweenTo(
      this.boardMetrics.originX + nextCol * this.boardMetrics.cellSize,
      this.boardMetrics.originY + nextRow * this.boardMetrics.cellSize,
      SNAP_TWEEN_MS,
      () => {
        if (solvedNow) {
          this.finishLevel('win');
        }
      },
    );

    if (moved) {
      this.session.moves += 1;
      this.updateHud();
    }
  }

  private startTimer(): void {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.finishedResult || this.session.timeRemaining <= 0) {
          return;
        }

        this.session.timeRemaining = Math.max(0, this.session.timeRemaining - 1);
        this.updateHud();

        if (this.session.timeRemaining === 0 && !this.board.isSolved()) {
          this.finishLevel('lose');
        }
      },
    });
  }

  private updateHud(): void {
    this.timerText.setText(this.formatTime(this.session.timeRemaining));
    if (this.finishedResult === 'lose' && this.session.timeRemaining === 0 && !this.board.isSolved()) {
      this.movesText.setText(`Out of time • Moves ${this.session.moves}`);
      return;
    }

    this.movesText.setText(this.board.isSolved() ? `Solved in ${this.session.moves} moves` : `Moves ${this.session.moves}`);
  }

  private finishLevel(result: ResultState): void {
    if (this.finishedResult) {
      return;
    }

    this.finishedResult = result;
    this.timerEvent?.remove(false);
    this.releaseActiveDrag();
    this.updateHud();

    if (result === 'win') {
      try {
        this.playWinReveal();
      } catch {
        this.showResultOverlay('win');
        return;
      }
      this.time.delayedCall(1280, () => this.showResultOverlay('win'));
      return;
    }

    this.showResultOverlay(result);
  }

  private releaseActiveDrag(): void {
    if (!this.dragState) {
      return;
    }

    const dragState = this.dragState;
    this.dragState = undefined;

    const piece = this.board.getPiece(dragState.pieceId);
    const view = this.pieceViews.get(dragState.pieceId);

    if (!view) {
      return;
    }

    view.setDragging(false);
    view.tweenTo(
      this.boardMetrics.originX + piece.col * this.boardMetrics.cellSize,
      this.boardMetrics.originY + piece.row * this.boardMetrics.cellSize,
      SNAP_TWEEN_MS,
    );
  }

  private showResultOverlay(result: ResultState): void {
    if (this.resultOverlay) {
      return;
    }

    const isWin = result === 'win';
    const container = this.add.container(0, 0);
    const scrim = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xf2e6cd, 0.7);

    const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 14, UI_TEXTURE_KEYS.modalPanel);
    panel.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.modalPanel].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.modalPanel].height,
    );

    const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 28, isWin ? 'Puzzle Solved' : "Time's Up", {
      fontFamily: 'Trebuchet MS',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#5b4634',
    }).setOrigin(0.5);

    const body = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 14,
      isWin
        ? `Time ${this.formatTime(this.session.timeRemaining)}  •  Moves ${this.session.moves}`
        : `Try again from the same layout  •  Moves ${this.session.moves}`,
      {
        fontFamily: 'Trebuchet MS',
        fontSize: '18px',
        color: '#7d6850',
      },
    ).setOrigin(0.5);

    const button = this.buildWideButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 64, isWin ? 'Play Again' : 'Try Again', () => {
      this.scene.restart({ levelId: this.session.level.id });
    });

    container.add([scrim, panel, title, body, button]);
    container.setDepth(80);
    this.resultOverlay = container;
  }

  private playWinReveal(): void {
    if (this.solvedReveal) {
      return;
    }

    const revealCells = this.getRevealCells();
    const texture = this.textures.get(this.session.level.imageKey);
    const sourceImage = texture.getSourceImage() as { width: number; height: number };
    const sparkleKey = this.ensureSparkleTexture();
    const translation = this.board.getSolvedTranslation();

    if (!translation) {
      return;
    }

    const bounds = this.getRevealBounds(revealCells);
    const reveal = this.add.container(bounds.centerX, bounds.centerY);
    const maskShape = this.add.graphics();
    maskShape.fillStyle(0xffffff, 1);
    const solvedBounds = this.session.level.solvedBounds;
    const imageX = this.boardMetrics.originX + (solvedBounds.minCol + translation.col) * this.boardMetrics.cellSize;
    const imageY = this.boardMetrics.originY + (solvedBounds.minRow + translation.row) * this.boardMetrics.cellSize;
    const imageWidth = solvedBounds.width * this.boardMetrics.cellSize;
    const imageHeight = solvedBounds.height * this.boardMetrics.cellSize;
    const solvedImage = this.add.image(imageX - bounds.centerX, imageY - bounds.centerY, this.session.level.imageKey);
    solvedImage.setOrigin(0);
    solvedImage.setDisplaySize(imageWidth, imageHeight);

    for (const cell of revealCells) {
      const { radius, x: maskX, y: maskY, width: maskWidth, height: maskHeight } = this.getRevealCellMask(cell.boardRow, cell.boardCol);
      maskShape.fillRoundedRect(maskX - bounds.centerX, maskY - bounds.centerY, maskWidth, maskHeight, radius);
    }

    maskShape.setVisible(false);
    const revealMask = maskShape.createGeometryMask();
    solvedImage.setMask(revealMask);
    reveal.add([solvedImage, maskShape]);

    const shineImage = this.add.image(imageX - bounds.centerX, imageY - bounds.centerY, this.session.level.imageKey);
    shineImage.setOrigin(0);
    shineImage.setDisplaySize(imageWidth, imageHeight);
    shineImage.setTint(0xfff6d8);
    shineImage.setBlendMode(Phaser.BlendModes.SCREEN);
    shineImage.setAlpha(0.36);
    shineImage.setMask(revealMask);
    shineImage.setCrop(0, 0, 0, sourceImage.height);
    reveal.add(shineImage);

    const sparkles = this.buildWinSparkles(bounds.width, bounds.height, sparkleKey, revealMask);
    reveal.add(sparkles);

    reveal.setDepth(56);
    reveal.setAlpha(0);
    reveal.setScale(1);
    this.solvedReveal = reveal;

    this.tweens.add({
      targets: Array.from(this.pieceViews.values()).flatMap((view) => view.getRevealTargets()),
      alpha: 0,
      duration: 150,
      ease: 'Sine.Out',
    });

    this.tweens.add({
      targets: reveal,
      alpha: 1,
      duration: 180,
      ease: 'Sine.Out',
    });

    this.tweens.add({
      targets: reveal,
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      scaleX: 1.12,
      scaleY: 1.12,
      duration: 380,
      ease: 'Cubic.Out',
    });

    const shineWidth = Math.max(24, Math.floor(sourceImage.width * 0.22));
    this.tweens.addCounter({
      from: -shineWidth,
      to: sourceImage.width + shineWidth,
      duration: 560,
      delay: 300,
      ease: 'Cubic.Out',
      onUpdate: (tween) => {
        const value = tween.getValue() ?? 0;
        const cropLeft = Phaser.Math.Clamp(value, 0, sourceImage.width);
        const cropRight = Phaser.Math.Clamp(value + shineWidth, 0, sourceImage.width);
        shineImage.setCrop(cropLeft, 0, Math.max(0, cropRight - cropLeft), sourceImage.height);
      },
    });

    this.time.delayedCall(900, () => {
      sparkles.destroy(true);
    });
  }

  private getRevealCells(): RevealCell[] {
    const translation = this.board.getSolvedTranslation();

    if (!translation) {
      return [];
    }

    const cells: RevealCell[] = [];

    for (const piece of this.board.getPieces()) {
      for (const solvedCell of piece.data.solvedCells) {
        cells.push({
          boardRow: solvedCell.row + translation.row,
          boardCol: solvedCell.col + translation.col,
        });
      }
    }

    return cells;
  }

  private getRevealCellMask(row: number, col: number): {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  } {
    const radius = PIECE_FACE_RADIUS - PIECE_FACE_INSET - 1;
    const openTop = !this.board.getOccupant(row - 1, col);
    const openBottom = !this.board.getOccupant(row + 1, col);
    const openLeft = !this.board.getOccupant(row, col - 1);
    const openRight = !this.board.getOccupant(row, col + 1);
    const leftInset = openLeft ? PIECE_FACE_INSET : 0;
    const rightInset = openRight ? PIECE_FACE_INSET : 0;
    const topInset = openTop ? PIECE_FACE_INSET : 0;
    const bottomInset = openBottom ? PIECE_FACE_INSET : 0;

    return {
      x: this.boardMetrics.originX + col * this.boardMetrics.cellSize + leftInset,
      y: this.boardMetrics.originY + row * this.boardMetrics.cellSize + topInset,
      width: this.boardMetrics.cellSize - leftInset - rightInset,
      height: this.boardMetrics.cellSize - topInset - bottomInset,
      radius: {
        tl: openTop && openLeft ? radius : 0,
        tr: openTop && openRight ? radius : 0,
        bl: openBottom && openLeft ? radius : 0,
        br: openBottom && openRight ? radius : 0,
      },
    };
  }

  private getRevealBounds(cells: RevealCell[]): {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  } {
    const rows = cells.map((cell) => cell.boardRow);
    const cols = cells.map((cell) => cell.boardCol);
    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minCol = Math.min(...cols);
    const maxCol = Math.max(...cols);
    const left = this.boardMetrics.originX + minCol * this.boardMetrics.cellSize;
    const top = this.boardMetrics.originY + minRow * this.boardMetrics.cellSize;
    const right = this.boardMetrics.originX + (maxCol + 1) * this.boardMetrics.cellSize;
    const bottom = this.boardMetrics.originY + (maxRow + 1) * this.boardMetrics.cellSize;

    return {
      left,
      top,
      right,
      bottom,
      width: right - left,
      height: bottom - top,
      centerX: (left + right) / 2,
      centerY: (top + bottom) / 2,
    };
  }

  private ensureSparkleTexture(): string {
    const key = 'win-sparkle';

    if (this.textures.exists(key)) {
      return key;
    }

    const sparkle = this.add.graphics();
    sparkle.fillStyle(0xffffff, 1);
    sparkle.fillCircle(8, 8, 4);
    sparkle.fillRect(7, 1, 2, 14);
    sparkle.fillRect(1, 7, 14, 2);
    sparkle.generateTexture(key, 16, 16);
    sparkle.destroy();

    return key;
  }

  private buildWinSparkles(
    width: number,
    height: number,
    sparkleKey: string,
    revealMask: Phaser.Display.Masks.GeometryMask,
  ): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0);

    for (let index = 0; index < 8; index += 1) {
      const sparkle = this.add.image(
        -width / 2 + Phaser.Math.FloatBetween(18, Math.max(18, width - 18)),
        -height / 2 + Phaser.Math.FloatBetween(18, Math.max(18, height - 18)),
        sparkleKey,
      );
      sparkle.setBlendMode(Phaser.BlendModes.SCREEN);
      sparkle.setTint(index % 2 === 0 ? 0xfff7db : 0xffe7a6);
      sparkle.setAlpha(0);
      sparkle.setScale(0.15);
      sparkle.setMask(revealMask);
      container.add(sparkle);

      this.tweens.add({
        targets: sparkle,
        alpha: { from: 0, to: 0.85 },
        scale: { from: 0.15, to: 0.52 },
        y: sparkle.y - Phaser.Math.FloatBetween(4, 10),
        duration: 240,
        delay: 80 + index * 45,
        ease: 'Sine.Out',
        yoyo: true,
        hold: 50,
      });
    }

    return container;
  }

  private buildIconButton(x: number, y: number, onPress: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    const button = this.add.image(0, 0, UI_TEXTURE_KEYS.buttonSquare);
    button.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].height,
    );

    const icon = this.add.image(0, -2, UI_TEXTURE_KEYS.resetIcon);
    icon.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.resetIcon].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.resetIcon].height,
    );

    container.add([button, icon]);
    container.setSize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].height,
    );
    container.setInteractive(
      new Phaser.Geom.Rectangle(
        -UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].width / 2,
        -UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].height / 2,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].width,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonSquare].height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    container.on('pointerdown', () => container.setY(y + 2));
    container.on('pointerup', () => {
      container.setY(y);
      onPress();
    });
    container.on('pointerout', () => container.setY(y));

    return container;
  }

  private buildWideButton(x: number, y: number, label: string, onPress: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    const button = this.add.image(0, 0, UI_TEXTURE_KEYS.buttonWide);
    button.setDisplaySize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].height,
    );

    const text = this.add.text(0, -4, label, {
      fontFamily: 'Trebuchet MS',
      fontSize: '21px',
      fontStyle: 'bold',
      color: '#5c4735',
    }).setOrigin(0.5);

    container.add([button, text]);
    container.setSize(
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].width,
      UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].height,
    );
    container.setInteractive(
      new Phaser.Geom.Rectangle(
        -UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].width / 2,
        -UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].height / 2,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].width,
        UI_TEXTURE_SIZES[UI_TEXTURE_KEYS.buttonWide].height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    container.on('pointerdown', () => container.setY(y + 2));
    container.on('pointerup', () => {
      container.setY(y);
      onPress();
    });
    container.on('pointerout', () => container.setY(y));

    return container;
  }

  private formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
