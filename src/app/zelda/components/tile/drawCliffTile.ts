import { TILE_SIZE } from './tileConstants';

export function drawCliffTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Base green
  ctx.fillStyle = '#267a2b';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Draw ovals for bushy texture
  ctx.fillStyle = '#18551a';
  ctx.beginPath();
  ctx.ellipse(x + 8, y + 8, 7, 6, 0, 0, 2 * Math.PI);
  ctx.ellipse(x + 24, y + 8, 7, 6, 0, 0, 2 * Math.PI);
  ctx.ellipse(x + 8, y + 24, 7, 6, 0, 0, 2 * Math.PI);
  ctx.ellipse(x + 24, y + 24, 7, 6, 0, 0, 2 * Math.PI);
  ctx.fill();
} 
