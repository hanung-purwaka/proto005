import Phaser from 'phaser';
import type { CompiledLevelData, CompiledPieceData } from '@shared/puzzle';

export const PIECE_FACE_RADIUS = 16;
export const PIECE_FACE_INSET = 1;
export const PIECE_SHADOW_DEPTH = 20;

interface OccupancyLookup {
  (row: number, col: number): string | null;
}

interface CellProfile {
  row: number;
  col: number;
  exposedTop: boolean;
  exposedBottom: boolean;
  exposedLeft: boolean;
  exposedRight: boolean;
  radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  openTop: boolean;
  openBottom: boolean;
  openLeft: boolean;
  openRight: boolean;
  joinedTop: boolean;
  joinedBottom: boolean;
  joinedLeft: boolean;
  joinedRight: boolean;
  imageEdgeTop: boolean;
  imageEdgeBottom: boolean;
  imageEdgeLeft: boolean;
  imageEdgeRight: boolean;
}

interface ImageEdgeProfile {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

type ConcaveCorner = {
  x: number;
  y: number;
  missing: 'tl' | 'tr' | 'bl' | 'br';
};

export class PieceView {
  readonly container: Phaser.GameObjects.Container;

  private static readonly FACE_HIT_ALPHA_THRESHOLD = 72;
  private static readonly FACE_RADIUS = PIECE_FACE_RADIUS;
  private static readonly DEPTH_X = 0;
  private static readonly DEPTH_Y = PIECE_SHADOW_DEPTH;
  private static readonly FACE_INSET = PIECE_FACE_INSET;
  private static readonly FACE_JOIN_OVERLAP = 3;
  private static readonly IMAGE_JOIN_BLEED = 2;
  private static readonly CONCAVE_TRIM_SIZE = PieceView.FACE_JOIN_OVERLAP + PieceView.IMAGE_JOIN_BLEED + 4;
  private static readonly DRAG_FACE_LIFT_Y = 4;
  private static readonly DRAG_UNDERLAY_LIFT_Y = 2;

  private readonly hitWidth: number;
  private readonly hitHeight: number;
  private readonly originOffsetX: number;
  private readonly originOffsetY: number;
  private readonly underlayContainer: Phaser.GameObjects.Container;
  private readonly visuals: Phaser.GameObjects.Container;
  private readonly shellContainer: Phaser.GameObjects.Container;
  private readonly faceContainer: Phaser.GameObjects.Container;
  private readonly imageEdgesByCell: Map<string, ImageEdgeProfile>;
  private readonly underlayTextureKey: string;
  private readonly shellTextureKey: string;
  private readonly faceTextureKey: string;
  private faceImage?: Phaser.GameObjects.Image;
  private isDragging = false;

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
    this.underlayTextureKey = `piece-underlay:${level.id}:${piece.id}`;
    this.shellTextureKey = `piece-shell:${level.id}:${piece.id}`;
    this.faceTextureKey = `piece-face:${level.id}:${piece.id}`;
    this.imageEdgesByCell = this.buildImageEdgeLookup();
    this.underlayContainer = scene.add.container(0, 0);
    this.visuals = scene.add.container(0, 0);
    this.shellContainer = scene.add.container(0, 0);
    this.faceContainer = scene.add.container(0, 0);

    this.visuals.add(this.shellContainer);
    this.visuals.add(this.faceContainer);
    this.container.add(this.visuals);
    this.underlayContainer.setDepth(4);
    this.container.setDepth(12);
  }

  setGridPosition(x: number, y: number): void {
    const centerX = x + this.hitWidth / 2;
    const centerY = y + this.hitHeight / 2;
    this.underlayContainer.setPosition(
      centerX,
      centerY - (this.isDragging ? PieceView.DRAG_UNDERLAY_LIFT_Y : 0),
    );
    this.container.setPosition(centerX, centerY);
  }

  setPreviewPosition(baseX: number, baseY: number, rowDeltaCells: number, colDeltaCells: number): void {
    const x = baseX + colDeltaCells * this.cellSize;
    const y = baseY + rowDeltaCells * this.cellSize;
    this.setGridPosition(x, y);
  }

  setDragging(isDragging: boolean): void {
    this.isDragging = isDragging;
    this.underlayContainer.setDepth(isDragging ? 8 : 4);
    this.container.setDepth(isDragging ? 40 : 12);
    this.visuals.setScale(isDragging ? 1.016 : 1);
    this.visuals.setY(isDragging ? -PieceView.DRAG_FACE_LIFT_Y : 0);
    this.underlayContainer.setY(this.container.y - (isDragging ? PieceView.DRAG_UNDERLAY_LIFT_Y : 0));
    this.visuals.setAlpha(1);
  }

  getRevealTargets(): Phaser.GameObjects.Container[] {
    return [this.container, this.underlayContainer];
  }

  matchesInputTarget(gameObject: Phaser.GameObjects.GameObject): boolean {
    return gameObject === this.faceImage;
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
    });

    this.scene.tweens.add({
      targets: this.underlayContainer,
      x: targetX,
      y: targetY - (this.isDragging ? PieceView.DRAG_UNDERLAY_LIFT_Y : 0),
      duration,
      ease:
        Phaser.Math.Distance.Between(this.container.x, this.container.y, targetX, targetY) < 6
          ? 'Sine.Out'
          : 'Back.Out',
      onComplete,
    });
  }

  refreshSurface(pieceRow: number, pieceCol: number, getOccupant: OccupancyLookup): void {
    this.underlayContainer.removeAll(true);
    this.shellContainer.removeAll(true);
    this.faceContainer.removeAll(true);

    const profiles = this.buildCellProfiles(pieceRow, pieceCol, getOccupant);
    this.buildUnderlay(profiles);
    this.buildShell(profiles);
    this.buildFace(profiles);
    this.visuals.bringToTop(this.faceContainer);
  }

  destroy(): void {
    if (this.scene.textures.exists(this.underlayTextureKey)) {
      this.scene.textures.remove(this.underlayTextureKey);
    }

    if (this.scene.textures.exists(this.faceTextureKey)) {
      this.scene.textures.remove(this.faceTextureKey);
    }

    if (this.scene.textures.exists(this.shellTextureKey)) {
      this.scene.textures.remove(this.shellTextureKey);
    }

    this.underlayContainer.destroy(true);
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
      const imageEdges = this.getImageEdgesForCell(cell.row, cell.col);
      const exposedTop = !topOccupant;
      const exposedBottom = !bottomOccupant;
      const exposedLeft = !leftOccupant;
      const exposedRight = !rightOccupant;
      const openTop = exposedTop && !imageEdges.top;
      const openBottom = exposedBottom && !imageEdges.bottom;
      const openLeft = exposedLeft && !imageEdges.left;
      const openRight = exposedRight && !imageEdges.right;
      const joinedTop = topOccupant === this.piece.id;
      const joinedBottom = bottomOccupant === this.piece.id;
      const joinedLeft = leftOccupant === this.piece.id;
      const joinedRight = rightOccupant === this.piece.id;
      const radius = PieceView.FACE_RADIUS;

      profiles.push({
        row: cell.row,
        col: cell.col,
        exposedTop,
        exposedBottom,
        exposedLeft,
        exposedRight,
        openTop,
        openBottom,
        openLeft,
        openRight,
        joinedTop,
        joinedBottom,
        joinedLeft,
        joinedRight,
        imageEdgeTop: imageEdges.top,
        imageEdgeBottom: imageEdges.bottom,
        imageEdgeLeft: imageEdges.left,
        imageEdgeRight: imageEdges.right,
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

  private buildImageEdgeLookup(): Map<string, ImageEdgeProfile> {
    const lookup = new Map<string, ImageEdgeProfile>();
    const solvedBounds = this.level.solvedBounds;

    this.piece.localCells.forEach((cell, index) => {
      const solvedCell = this.piece.solvedCells[index];

      lookup.set(`${cell.row},${cell.col}`, {
        top: solvedCell.row === solvedBounds.minRow,
        bottom: solvedCell.row === solvedBounds.maxRow,
        left: solvedCell.col === solvedBounds.minCol,
        right: solvedCell.col === solvedBounds.maxCol,
      });
    });

    return lookup;
  }

  private getImageEdgesForCell(row: number, col: number): ImageEdgeProfile {
    return this.imageEdgesByCell.get(`${row},${col}`) ?? {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
  }

  private buildUnderlay(profiles: CellProfile[]): void {
    if (this.scene.textures.exists(this.underlayTextureKey)) {
      this.scene.textures.remove(this.underlayTextureKey);
    }

    const textureHeight = this.hitHeight + PieceView.DEPTH_Y + 2;
    const underlayTexture = this.scene.textures.createCanvas(this.underlayTextureKey, this.hitWidth, textureHeight);

    if (!underlayTexture) {
      throw new Error(`Unable to create underlay texture for piece "${this.piece.id}".`);
    }

    const context = underlayTexture.getContext();
    context.clearRect(0, 0, this.hitWidth, textureHeight);
    context.fillStyle = '#000000';
    this.traceBottomUnderlayPath(context, profiles);
    context.fill();

    underlayTexture.refresh();

    const image = this.scene.add.image(this.originOffsetX, this.originOffsetY, this.underlayTextureKey);
    image.setOrigin(0);
    this.underlayContainer.add(image);
  }

  private buildFace(profiles: CellProfile[]): void {
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
    context.save();
    this.traceSilhouettePath(context, profiles, 0);
    context.clip();
    context.drawImage(
      solvedSurface,
      -((this.piece.solvedOrigin.col - solvedBounds.minCol) * this.cellSize),
      -((this.piece.solvedOrigin.row - solvedBounds.minRow) * this.cellSize),
    );
    context.restore();

    this.carveConcaveFaceCorners(context);

    faceTexture.refresh();

    const image = this.scene.add.image(this.originOffsetX, this.originOffsetY, this.faceTextureKey);
    image.setOrigin(0);
    image.setInteractive({
      pixelPerfect: true,
      alphaTolerance: PieceView.FACE_HIT_ALPHA_THRESHOLD,
    });
    this.faceContainer.add(image);
    this.faceImage = image;
    this.visuals.bringToTop(this.faceContainer);
  }

  private buildShell(profiles: CellProfile[]): void {
    if (this.scene.textures.exists(this.shellTextureKey)) {
      this.scene.textures.remove(this.shellTextureKey);
    }

    const shellTexture = this.scene.textures.createCanvas(this.shellTextureKey, this.hitWidth, this.hitHeight);

    if (!shellTexture) {
      throw new Error(`Unable to create shell texture for piece "${this.piece.id}".`);
    }

    const context = shellTexture.getContext();
    context.clearRect(0, 0, this.hitWidth, this.hitHeight);
    context.fillStyle = '#000000';
    this.traceShellPath(context, profiles, 0);
    context.fill();
    this.carveShellConcaveCorners(context, 0);
    shellTexture.refresh();

    const image = this.scene.add.image(this.originOffsetX, this.originOffsetY, this.shellTextureKey);
    image.setOrigin(0);
    this.shellContainer.add(image);
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
      x: Math.round(this.originOffsetX + profile.col * this.cellSize + leftInset - overlapLeft),
      y: Math.round(this.originOffsetY + profile.row * this.cellSize + topInset - overlapTop),
      width: Math.round(this.cellSize - leftInset - rightInset + overlapLeft + overlapRight),
      height: Math.round(this.cellSize - topInset - bottomInset + overlapTop + overlapBottom),
      radius: this.offsetRadius(profile.radius, -PieceView.FACE_INSET),
    };
  }

  private getShellRect(profile: CellProfile): {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  } {
    return {
      x: this.originOffsetX + profile.col * this.cellSize,
      y: this.originOffsetY + profile.row * this.cellSize,
      width: this.cellSize,
      height: this.cellSize,
      radius: profile.radius,
    };
  }

  private getConcaveCorners(): ConcaveCorner[] {
    const occupied = new Set(this.piece.localCells.map((cell) => `${cell.row},${cell.col}`));
    const corners: ConcaveCorner[] = [];

    for (let row = 0; row < this.piece.height - 1; row += 1) {
      for (let col = 0; col < this.piece.width - 1; col += 1) {
        const tl = occupied.has(`${row},${col}`);
        const tr = occupied.has(`${row},${col + 1}`);
        const bl = occupied.has(`${row + 1},${col}`);
        const br = occupied.has(`${row + 1},${col + 1}`);
        const count = Number(tl) + Number(tr) + Number(bl) + Number(br);

        if (count !== 3) {
          continue;
        }

        let missing: ConcaveCorner['missing'];

        if (!tl) {
          missing = 'tl';
        } else if (!tr) {
          missing = 'tr';
        } else if (!bl) {
          missing = 'bl';
        } else {
          missing = 'br';
        }

        corners.push({
          x: (col + 1) * this.cellSize,
          y: (row + 1) * this.cellSize,
          missing,
        });
      }
    }

    return corners;
  }

  private carveConcaveFaceCorners(context: CanvasRenderingContext2D): void {
    this.carveConcaveCorners(context, PieceView.CONCAVE_TRIM_SIZE, 0);
  }

  private carveShellConcaveCorners(context: CanvasRenderingContext2D, offsetY: number): void {
    this.carveConcaveCorners(context, PieceView.CONCAVE_TRIM_SIZE - 1, offsetY);
  }

  private carveConcaveCorners(context: CanvasRenderingContext2D, size: number, offsetY: number): void {
    context.save();
    context.globalCompositeOperation = 'destination-out';

    for (const corner of this.getConcaveCorners()) {
      const y = corner.y + offsetY;
      const [startAngle, endAngle] = this.getConcaveAngles(corner.missing);
      this.fillConcaveQuarter(context, corner.x, y, size, startAngle, endAngle);
    }

    context.restore();
  }

  private fillConcaveQuarter(
    context: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ): void {
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
  }

  private getConcaveAngles(missing: ConcaveCorner['missing']): [number, number] {
    if (missing === 'tl') {
      return [Math.PI, (Math.PI * 3) / 2];
    }

    if (missing === 'tr') {
      return [(Math.PI * 3) / 2, Math.PI * 2];
    }

    if (missing === 'br') {
      return [0, Math.PI / 2];
    }

    return [Math.PI / 2, Math.PI];
  }
  private getJoinedRect(
    profile: CellProfile,
    offsetX: number,
    offsetY: number,
    widthDelta: number,
    heightDelta: number,
    radiusDelta: number,
  ): {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
  } {
    const rect = this.getFaceRect(profile);

    return {
      x: rect.x + offsetX,
      y: rect.y + offsetY,
      width: Math.max(0, rect.width + widthDelta),
      height: Math.max(0, rect.height + heightDelta),
      radius: this.offsetRadius(rect.radius, radiusDelta),
    };
  }

  private traceSilhouettePath(
    context: CanvasRenderingContext2D,
    profiles: CellProfile[],
    offsetY: number,
  ): void {
    context.beginPath();

    for (const profile of profiles) {
      const rect = this.getFaceRect(profile);
      const drawX = rect.x - this.originOffsetX;
      const drawY = rect.y - this.originOffsetY + offsetY;

      this.traceRoundedRectPath(context, drawX, drawY, rect.width, rect.height, rect.radius);
    }
  }

  private traceShellPath(
    context: CanvasRenderingContext2D,
    profiles: CellProfile[],
    offsetY: number,
  ): void {
    context.beginPath();

    for (const profile of profiles) {
      const rect = this.getShellRect(profile);
      const drawX = rect.x - this.originOffsetX;
      const drawY = rect.y - this.originOffsetY + offsetY;

      this.traceRoundedRectPath(context, drawX, drawY, rect.width, rect.height, rect.radius);
    }
  }

  private traceBottomUnderlayPath(
    context: CanvasRenderingContext2D,
    profiles: CellProfile[],
  ): void {
    context.beginPath();

    const bottomProfiles = profiles
      .filter((profile) => profile.exposedBottom)
      .sort((left, right) => left.row - right.row || left.col - right.col);

    for (let index = 0; index < bottomProfiles.length; index += 1) {
      const start = bottomProfiles[index];
      let end = start;

      while (
        index + 1 < bottomProfiles.length
        && bottomProfiles[index + 1].row === start.row
        && bottomProfiles[index + 1].col === end.col + 1
      ) {
        end = bottomProfiles[index + 1];
        index += 1;
      }

      const leftRect = this.getShellRect(start);
      const rightRect = this.getShellRect(end);
      const drawX = leftRect.x - this.originOffsetX;
      const drawY = leftRect.y - this.originOffsetY + leftRect.height - PieceView.FACE_RADIUS;
      const width = rightRect.x + rightRect.width - leftRect.x;
      const height = PieceView.FACE_RADIUS + PieceView.DEPTH_Y;
      const radius = {
        tl: 0,
        tr: 0,
        bl: start.exposedLeft ? PieceView.FACE_RADIUS : 0,
        br: end.exposedRight ? PieceView.FACE_RADIUS : 0,
      };

      this.traceRoundedRectPath(context, drawX, drawY, width, height, radius);
    }
  }

  private getSolvedSurfaceKey(): string {
    return `solved-surface:${this.level.id}:${this.cellSize}`;
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

}
