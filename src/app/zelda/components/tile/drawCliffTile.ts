import { TILE_SIZE } from './tileConstants';

export type CliffTileVariant =
  | 'full'
  | 'top-left-diagonal'
  | 'top-right-diagonal'
  | 'bottom-left-diagonal'
  | 'bottom-right-diagonal';

export function drawCliffTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: CliffTileVariant = 'full'
) {
  // Helper to draw sand
  const drawSand = () => {
    ctx.fillStyle = '#e9d8a6';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  };

  // Helper to draw cliff
  const drawCliff = () => {
    ctx.fillStyle = '#267a2b';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#18551a';
    ctx.beginPath();
    ctx.ellipse(x + 8, y + 8, 7, 6, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + 24, y + 8, 7, 6, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + 8, y + 24, 7, 6, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + 24, y + 24, 7, 6, 0, 0, 2 * Math.PI);
    ctx.fill();
  };

  if (variant === 'full') {
    drawCliff();
    return;
  }

  // Draw sand as base
  drawSand();

  // Draw diagonal cliff overlay
  ctx.save();
  ctx.beginPath();
  if (variant === 'top-left-diagonal') {
    ctx.moveTo(x, y);
    ctx.lineTo(x + TILE_SIZE, y);
    ctx.lineTo(x, y + TILE_SIZE);
    ctx.closePath();
  } else if (variant === 'top-right-diagonal') {
    ctx.moveTo(x + TILE_SIZE, y);
    ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE);
    ctx.lineTo(x, y);
    ctx.closePath();
  } else if (variant === 'bottom-left-diagonal') {
    ctx.moveTo(x, y + TILE_SIZE);
    ctx.lineTo(x, y);
    ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE);
    ctx.closePath();
  } else if (variant === 'bottom-right-diagonal') {
    ctx.moveTo(x + TILE_SIZE, y + TILE_SIZE);
    ctx.lineTo(x, y + TILE_SIZE);
    ctx.lineTo(x + TILE_SIZE, y);
    ctx.closePath();
  }
  ctx.clip();
  drawCliff();
  ctx.restore();
} 
