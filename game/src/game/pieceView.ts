import Phaser from 'phaser';
import type { CompiledLevelData, CompiledPieceData } from '@shared/puzzle';
import type { DragAxis } from './runtimeTypes';

export const PIECE_FACE_RADIUS = 16;
export const PIECE_FACE_INSET = 3;

interface CellHitArea {
  cells: Array<{ row: number; col: number }>;
  cellSize: number;
  inset: number;
  radius: number;
}

interface OccupancyLookup {
  (row: number, col: number): string | null;
}

interface CellProfile {
  row: number;
  col: number;
  radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  openTop: boolean;
  openBottom: boolean;
  openLeft: boolean;
  openRight: boolean;
  joinedTop: boolean;
  joinedBottom: boolean;
  joinedLeft: boolean;
  joinedRight: boolean;
}

export class PieceView {
  readonly container: Phaser.GameObjects.Container;

  private static readonly FACE_HIT_INSET = 7;
  private static readonly FACE_HIT_RADIUS = 12;
  private static readonly FACE_RADIUS = PIECE_FACE_RADIUS;
  private static readonly DEPTH_X = 2;
  private static readonly DEPTH_Y = 5;
  private static readonly FACE_INSET = PIECE_FACE_INSET;
  private static readonly FACE_JOIN_OVERLAP = 1;

  private readonly hitWidth: number;
  private readonly hitHeight: number;
  private readonly originOffsetX: number;
  private readonly originOffsetY: number;
  private readonly visuals: Phaser.GameObjects.Container;
  private readonly faceContainer: Phaser.GameObjects.Container;
  private readonly faceTextureKey: string;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly level: CompiledLevelData,
    private readonly piece: CompiledPieceData,
    private readonly textureKey: string,
    private readonly cellSize: number,
  ) {
    this.container = scene.add.container(0, 0);
    this.hitWidth = piece.width * cellSize;
    this.hitHeight = piece.height * cellSize;
    this.originOffsetX = -this.hitWidth / 2;
    this.originOffsetY = -this.hitHeight / 2;
    this.faceTextureKey = `piece-face:${level.id}:${piece.id}`;
    this.visuals = scene.add.container(0, 0);
    this.faceContainer = scene.add.container(0, 0);

    this.visuals.add(this.faceContainer);
    this.container.add(this.visuals);

    this.container.setSize(this.hitWidth, this.hitHeight);
    this.container.setInteractive(
      {
        cells: this.piece.localCells,
        cellSize: this.cellSize,
        inset: PieceView.FACE_HIT_INSET,
        radius: PieceView.FACE_HIT_RADIUS,
      } satisfies CellHitArea,
      (hitArea, x, y) => this.isPointInsideFace(hitArea as CellHitArea, x, y),
    );
  }

  setGridPosition(x: number, y: number): void {
    this.container.setPosition(x + this.hitWidth / 2, y + this.hitHeight / 2);
  }

  setPreviewPosition(baseX: number, baseY: number, axis: DragAxis | undefined, deltaCells: number): void {
    const x = axis === 'horizontal' ? baseX + deltaCells * this.cellSize : baseX;
    const y = axis === 'vertical' ? baseY + deltaCells * this.cellSize : baseY;
    this.setGridPosition(x, y);
  }

  setDragging(isDragging: boolean): void {
    this.container.setDepth(isDragging ? 40 : 12);
    this.visuals.setScale(isDragging ? 1.016 : 1);
    this.visuals.setY(isDragging ? -4 : 0);
    this.visuals.setAlpha(1);
  }

  tweenTo(x: number, y: number, duration: number, onComplete?: () => void): void {
    const targetX = x + this.hitWidth / 2;
    const targetY = y + this.hitHeight / 2;

    this.scene.tweens.add({
      targets: this.container,
      x: targetX,
      y: targetY,
      duration,
      ease:
        Phaser.Math.Distance.Between(this.container.x, this.container.y, targetX, targetY) < 6
          ? 'Sine.Out'
          : 'Back.Out',
      onComplete,
    });
  }

  refreshSurface(pieceRow: number, pieceCol: number, getOccupant: OccupancyLookup): void {
    for (const child of [...this.visuals.list]) {
      if (child !== this.faceContainer) {
        child.destroy();
      }
    }

    this.faceContainer.removeAll(true);

    const profiles = this.buildCellProfiles(pieceRow, pieceCol, getOccupant);
    this.buildShadow(profiles);
    this.buildDepth(profiles);
    this.buildSideWalls(profiles);
    this.buildFace(profiles);
    this.buildEdgeLines(profiles);
  }

  destroy(): void {
    if (this.scene.textures.exists(this.faceTextureKey)) {
      this.scene.textures.remove(this.faceTextureKey);
    }

    this.container.destroy(true);
  }

  private buildCellProfiles(pieceRow: number, pieceCol: number, getOccupant: OccupancyLookup): CellProfile[] {
    const profiles: CellProfile[] = [];

    for (const cell of this.piece.localCells) {
      const boardRow = pieceRow + cell.row;
      const boardCol = pieceCol + cell.col;
      const topOccupant = getOccupant(boardRow - 1, boardCol);
      const bottomOccupant = getOccupant(boardRow + 1, boardCol);
      const leftOccupant = getOccupant(boardRow, boardCol - 1);
      const rightOccupant = getOccupant(boardRow, boardCol + 1);
      const openTop = !topOccupant;
      const openBottom = !bottomOccupant;
      const openLeft = !leftOccupant;
      const openRight = !rightOccupant;
      const joinedTop = topOccupant === this.piece.id;
      const joinedBottom = bottomOccupant === this.piece.id;
      const joinedLeft = leftOccupant === this.piece.id;
      const joinedRight = rightOccupant === this.piece.id;
      const radius = PieceView.FACE_RADIUS;

      profiles.push({
        row: cell.row,
        col: cell.col,
        openTop,
        openBottom,
        openLeft,
        openRight,
        joinedTop,
        joinedBottom,
        joinedLeft,
        joinedRight,
        radius: {
          tl: openTop && openLeft ? radius : 0,
          tr: openTop && openRight ? radius : 0,
          bl: openBottom && openLeft ? radius : 0,
          br: openBottom && openRight ? radius : 0,
        },
      });
    }

    return profiles;
  }

  private buildShadow(profiles: CellProfile[]): void {
    const shadow = this.scene.add.graphics();
    shadow.fillStyle(0x000000, 0.28);

    for (const profile of profiles) {
      const x = this.originOffsetX + profile.col * this.cellSize + PieceView.FACE_INSET + 2;
      const y = this.originOffsetY + profile.row * this.cellSize + PieceView.DEPTH_Y + 4;
      const width = this.cellSize - PieceView.FACE_INSET * 2 - 4;
      const height = 8;

      shadow.fillRoundedRect(
        x,
        y,
        width,
        height,
        6,
      );
    }

    this.visuals.add(shadow);
  }

  private buildDepth(profiles: CellProfile[]): void {
    const body = this.scene.add.graphics();
    body.fillStyle(0x000000, 0.28);
    this.drawCellFills(body, profiles, 0, PieceView.DEPTH_Y - 1, 0, -2, -3);

    const bodyShade = this.scene.add.graphics();
    bodyShade.fillStyle(0x000000, 0.4);
    this.drawCellFills(bodyShade, profiles, 0, PieceView.DEPTH_Y + 1, 1, -4, -6);

    this.visuals.add([body, bodyShade]);
  }

  private buildSideWalls(profiles: CellProfile[]): void {
    const bottomWall = this.scene.add.graphics();
    const bottomHighlight = this.scene.add.graphics();

    bottomWall.fillStyle(0x000000, 0.5);
    bottomHighlight.lineStyle(2, 0x000000, 0.16);

    for (const profile of profiles) {
      const x = this.originOffsetX + profile.col * this.cellSize + PieceView.FACE_INSET;
      const y = this.originOffsetY + profile.row * this.cellSize + PieceView.FACE_INSET;
      const faceSize = this.cellSize - PieceView.FACE_INSET * 2;
      const radius = PieceView.FACE_RADIUS - 4;
      const bottomInset = profile.openBottom ? radius - 2 : 6;
      const leftInset = profile.openLeft ? radius - 2 : 6;
      const rightInset = profile.openRight ? radius - 2 : 6;

      if (profile.openBottom) {
        this.fillQuad(
          bottomWall,
          x + leftInset,
          y + faceSize - 1,
          x + leftInset + PieceView.DEPTH_X,
          y + faceSize - 1 + PieceView.DEPTH_Y,
          x + faceSize - rightInset + PieceView.DEPTH_X,
          y + faceSize - 1 + PieceView.DEPTH_Y,
          x + faceSize - rightInset,
          y + faceSize - 1,
        );
        bottomHighlight.lineBetween(
          x + leftInset + 4,
          y + faceSize + PieceView.DEPTH_Y - 3,
          x + faceSize - rightInset - 4,
          y + faceSize + PieceView.DEPTH_Y - 3,
        );
      }
    }

    this.visuals.add([bottomWall, bottomHighlight]);
  }

  private buildFace(profiles: CellProfile[]): void {
    const faceBase = this.scene.add.graphics();
    faceBase.fillStyle(0xf7edd7, 1);
    this.drawFaceCellFills(faceBase, profiles);
    this.faceContainer.add(faceBase);

    const glossLayer = this.scene.add.container(0, 0);
    const maskShape = this.scene.add.graphics();
    maskShape.fillStyle(0xffffff, 1);
    this.drawFaceCellFills(maskShape, profiles);
    maskShape.setVisible(false);
    this.faceContainer.add(maskShape);
    const faceMask = maskShape.createGeometryMask();

    const texture = this.scene.textures.get(this.textureKey);
    const source = texture.getSourceImage() as { width: number; height: number };
    const solvedBounds = this.level.solvedBounds;
    const solvedSurfaceKey = this.getSolvedSurfaceKey();
    let solvedSurface = this.scene.textures.get(solvedSurfaceKey).getSourceImage() as CanvasImageSource | undefined;

    if (!this.scene.textures.exists(solvedSurfaceKey)) {
      const solvedTexture = this.scene.textures.createCanvas(
        solvedSurfaceKey,
        solvedBounds.width * this.cellSize,
        solvedBounds.height * this.cellSize,
      );

      if (!solvedTexture) {
        throw new Error(`Unable to create solved surface for level "${this.level.id}".`);
      }

      const solvedContext = solvedTexture.getContext();
      solvedContext.clearRect(0, 0, solvedBounds.width * this.cellSize, solvedBounds.height * this.cellSize);
      solvedContext.drawImage(
        source as CanvasImageSource,
        0,
        0,
        source.width,
        source.height,
        0,
        0,
        solvedBounds.width * this.cellSize,
        solvedBounds.height * this.cellSize,
      );
      solvedTexture.refresh();
      solvedSurface = solvedTexture.getSourceImage() as CanvasImageSource;
    }

    if (!solvedSurface) {
      solvedSurface = this.scene.textures.get(solvedSurfaceKey).getSourceImage() as CanvasImageSource;
    }

    if (this.scene.textures.exists(this.faceTextureKey)) {
      this.scene.textures.remove(this.faceTextureKey);
    }

    const faceTexture = this.scene.textures.createCanvas(this.faceTextureKey, this.hitWidth, this.hitHeight);

    if (!faceTexture) {
      throw new Error(`Unable to create face texture for piece "${this.piece.id}".`);
    }

    const context = faceTexture.getContext();
    context.clearRect(0, 0, this.hitWidth, this.hitHeight);

    const cropX = (this.piece.solvedOrigin.col - solvedBounds.minCol) * this.cellSize;
    const cropY = (this.piece.solvedOrigin.row - solvedBounds.minRow) * this.cellSize;
    const cropWidth = this.piece.width * this.cellSize;
    const cropHeight = this.piece.height * this.cellSize;

    context.save();
    context.beginPath();

    for (const profile of profiles) {
      const rect = this.getFaceRect(profile);
      const drawX = rect.x - this.originOffsetX;
      const drawY = rect.y - this.originOffsetY;
      this.traceRoundedRectPath(context, drawX, drawY, rect.width, rect.height, rect.radius);
    }

    context.clip();
    context.drawImage(
      solvedSurface,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      this.hitWidth,
      this.hitHeight,
    );
    context.restore();

    faceTexture.refresh();

    const image = this.scene.add.image(this.originOffsetX, this.originOffsetY, this.faceTextureKey);
    image.setOrigin(0);
    this.faceContainer.add(image);

    const faceRects = profiles.map((profile) => this.getFaceRect(profile));
    const pieceFaceLeft = faceRects.reduce((min, rect) => Math.min(min, rect.x), Infinity);
    const pieceFaceTop = faceRects.reduce((min, rect) => Math.min(min, rect.y), Infinity);
    const pieceFaceRight = faceRects.reduce((max, rect) => Math.max(max, rect.x + rect.width), -Infinity);
    const pieceFaceBottom = faceRects.reduce((max, rect) => Math.max(max, rect.y + rect.height), -Infinity);
    const pieceFaceWidth = pieceFaceRight - pieceFaceLeft;
    const pieceFaceHeight = pieceFaceBottom - pieceFaceTop;

    const gloss = this.scene.add.graphics();
    gloss.fillStyle(0xfff7e8, 0.16);
    gloss.fillRoundedRect(pieceFaceLeft + 10, pieceFaceTop + 8, Math.max(0, pieceFaceWidth - 20), 10, 5);
    gloss.fillStyle(0xffffff, 0.08);
    gloss.fillCircle(pieceFaceLeft + pieceFaceWidth * 0.28, pieceFaceTop + pieceFaceHeight * 0.22, 7);
    glossLayer.add(gloss);

    const faceShade = this.scene.add.graphics();
    faceShade.fillStyle(0x6d4c3a, 0.05);
    faceShade.fillRoundedRect(
      pieceFaceLeft + 10,
      pieceFaceTop + pieceFaceHeight - 16,
      Math.max(0, pieceFaceWidth - 20),
      6,
      3,
    );
    glossLayer.add(faceShade);

    glossLayer.setMask(faceMask);
    this.faceContainer.add(glossLayer);
    this.visuals.bringToTop(this.faceContainer);
  }

  private buildEdgeLines(profiles: CellProfile[]): void {
    const outline = this.scene.add.graphics();
    const highlight = this.scene.add.graphics();

    outline.lineStyle(1.8, 0x000000, 0.68);
    highlight.lineStyle(1.2, 0xfff7e8, 0.4);
    const radius = PieceView.FACE_RADIUS - 4;
    const highlightRadius = radius - 4;

    for (const profile of profiles) {
      const x = this.originOffsetX + profile.col * this.cellSize + PieceView.FACE_INSET;
      const y = this.originOffsetY + profile.row * this.cellSize + PieceView.FACE_INSET;
      const faceSize = this.cellSize - PieceView.FACE_INSET * 2;
      const inset = 3;
      const leftGap = profile.openLeft ? radius : 6;
      const rightGap = profile.openRight ? radius : 6;
      const topGap = profile.openTop ? radius : 6;
      const bottomGap = profile.openBottom ? radius : 6;

      if (profile.openTop) {
        outline.lineBetween(x + leftGap, y + inset, x + faceSize - rightGap, y + inset);
        highlight.lineBetween(
          x + (profile.openLeft ? highlightRadius : 10),
          y + inset + 3,
          x + faceSize - (profile.openRight ? highlightRadius : 10),
          y + inset + 3,
        );
      }

      if (profile.openLeft) {
        outline.lineBetween(x + inset, y + topGap, x + inset, y + faceSize - bottomGap);
        highlight.lineBetween(
          x + inset + 3,
          y + (profile.openTop ? highlightRadius : 10),
          x + inset + 3,
          y + faceSize - (profile.openBottom ? highlightRadius : 10),
        );
      }

      if (profile.openBottom) {
        outline.lineBetween(
          x + leftGap,
          y + faceSize - inset,
          x + faceSize - rightGap,
          y + faceSize - inset,
        );
      }

      if (profile.openRight) {
        outline.lineBetween(
          x + faceSize - inset,
          y + topGap,
          x + faceSize - inset,
          y + faceSize - bottomGap,
        );
      }

      if (profile.openTop && profile.openLeft) {
        this.strokeCornerArc(outline, x + radius, y + radius, radius - inset, Math.PI, Math.PI * 1.5);
        this.strokeCornerArc(highlight, x + highlightRadius, y + highlightRadius, highlightRadius - 2, Math.PI, Math.PI * 1.5);
      }

      if (profile.openTop && profile.openRight) {
        this.strokeCornerArc(
          outline,
          x + faceSize - radius,
          y + radius,
          radius - inset,
          Math.PI * 1.5,
          Math.PI * 2,
        );
        this.strokeCornerArc(
          highlight,
          x + faceSize - highlightRadius,
          y + highlightRadius,
          highlightRadius - 2,
          Math.PI * 1.5,
          Math.PI * 2,
        );
      }

      if (profile.openBottom && profile.openRight) {
        this.strokeCornerArc(
          outline,
          x + faceSize - radius,
          y + faceSize - radius,
          radius - inset,
          0,
          Math.PI * 0.5,
        );
      }

      if (profile.openBottom && profile.openLeft) {
        this.strokeCornerArc(
          outline,
          x + radius,
          y + faceSize - radius,
          radius - inset,
          Math.PI * 0.5,
          Math.PI,
        );
      }
    }

    this.visuals.add([outline, highlight]);
  }

  private drawCellFills(
    graphics: Phaser.GameObjects.Graphics,
    profiles: CellProfile[],
    offsetX: number,
    offsetY: number,
    inset: number,
    sizeDelta: number,
    radiusDelta: number,
  ): void {
    for (const profile of profiles) {
      const size = this.cellSize - inset * 2 + sizeDelta;
      graphics.fillRoundedRect(
        this.originOffsetX + profile.col * this.cellSize + inset + offsetX,
        this.originOffsetY + profile.row * this.cellSize + inset + offsetY,
        size,
        size,
        this.offsetRadius(profile.radius, radiusDelta),
      );
    }
  }

  private drawFaceCellFills(graphics: Phaser.GameObjects.Graphics, profiles: CellProfile[]): void {
    for (const profile of profiles) {
      const rect = this.getFaceRect(profile);
      graphics.fillRoundedRect(rect.x, rect.y, rect.width, rect.height, rect.radius);
    }
  }

  private getFaceRect(profile: CellProfile): {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  } {
    const leftInset = profile.joinedLeft ? 0 : PieceView.FACE_INSET;
    const rightInset = profile.joinedRight ? 0 : PieceView.FACE_INSET;
    const topInset = profile.joinedTop ? 0 : PieceView.FACE_INSET;
    const bottomInset = profile.joinedBottom ? 0 : PieceView.FACE_INSET;
    const overlapLeft = profile.joinedLeft ? PieceView.FACE_JOIN_OVERLAP : 0;
    const overlapRight = profile.joinedRight ? PieceView.FACE_JOIN_OVERLAP : 0;
    const overlapTop = profile.joinedTop ? PieceView.FACE_JOIN_OVERLAP : 0;
    const overlapBottom = profile.joinedBottom ? PieceView.FACE_JOIN_OVERLAP : 0;

    return {
      x: this.originOffsetX + profile.col * this.cellSize + leftInset - overlapLeft,
      y: this.originOffsetY + profile.row * this.cellSize + topInset - overlapTop,
      width: this.cellSize - leftInset - rightInset + overlapLeft + overlapRight,
      height: this.cellSize - topInset - bottomInset + overlapTop + overlapBottom,
      radius: this.offsetRadius(profile.radius, -PieceView.FACE_INSET),
    };
  }

  private getSolvedSurfaceKey(): string {
    return `solved-surface:${this.level.id}:${this.cellSize}`;
  }

  private isPointInsideFace(hitArea: CellHitArea, x: number, y: number): boolean {
    for (const cell of hitArea.cells) {
      const left = this.originOffsetX + cell.col * hitArea.cellSize + hitArea.inset;
      const top = this.originOffsetY + cell.row * hitArea.cellSize + hitArea.inset;
      const size = hitArea.cellSize - hitArea.inset * 2;

      if (this.isPointInsideRoundedRect(x, y, left, top, size, size, hitArea.radius)) {
        return true;
      }
    }

    return false;
  }

  private isPointInsideRoundedRect(
    pointX: number,
    pointY: number,
    left: number,
    top: number,
    width: number,
    height: number,
    radius: number,
  ): boolean {
    if (pointX < left || pointX > left + width || pointY < top || pointY > top + height) {
      return false;
    }

    const clampedRadius = Math.min(radius, width / 2, height / 2);
    const innerLeft = left + clampedRadius;
    const innerRight = left + width - clampedRadius;
    const innerTop = top + clampedRadius;
    const innerBottom = top + height - clampedRadius;

    if ((pointX >= innerLeft && pointX <= innerRight) || (pointY >= innerTop && pointY <= innerBottom)) {
      return true;
    }

    const cornerX = pointX < innerLeft ? innerLeft : innerRight;
    const cornerY = pointY < innerTop ? innerTop : innerBottom;

    return Phaser.Math.Distance.Between(pointX, pointY, cornerX, cornerY) <= clampedRadius;
  }

  private offsetRadius(
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius,
  delta: number,
  ): Phaser.Types.GameObjects.Graphics.RoundedRectRadius {
    const corners = typeof radius === 'number'
      ? { tl: radius, tr: radius, bl: radius, br: radius }
      : {
          tl: radius.tl ?? 0,
          tr: radius.tr ?? 0,
          bl: radius.bl ?? 0,
          br: radius.br ?? 0,
        };

    return {
      tl: Math.max(0, corners.tl + delta),
      tr: Math.max(0, corners.tr + delta),
      bl: Math.max(0, corners.bl + delta),
      br: Math.max(0, corners.br + delta),
    };
  }

  private traceRoundedRectPath(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius,
  ): void {
    const corners = typeof radius === 'number'
      ? { tl: radius, tr: radius, bl: radius, br: radius }
      : {
          tl: radius.tl ?? 0,
          tr: radius.tr ?? 0,
          bl: radius.bl ?? 0,
          br: radius.br ?? 0,
        };
    const maxRadius = Math.min(width / 2, height / 2);
    const tl = Math.min(corners.tl, maxRadius);
    const tr = Math.min(corners.tr, maxRadius);
    const br = Math.min(corners.br, maxRadius);
    const bl = Math.min(corners.bl, maxRadius);

    context.moveTo(x + tl, y);
    context.lineTo(x + width - tr, y);
    context.quadraticCurveTo(x + width, y, x + width, y + tr);
    context.lineTo(x + width, y + height - br);
    context.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
    context.lineTo(x + bl, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - bl);
    context.lineTo(x, y + tl);
    context.quadraticCurveTo(x, y, x + tl, y);
    context.closePath();
  }

  private strokeCornerArc(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ): void {
    graphics.beginPath();
    graphics.arc(x, y, radius, startAngle, endAngle);
    graphics.strokePath();
  }

  private fillQuad(
    graphics: Phaser.GameObjects.Graphics,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ): void {
    graphics.beginPath();
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
    graphics.lineTo(x3, y3);
    graphics.lineTo(x4, y4);
    graphics.closePath();
    graphics.fillPath();
  }

}
