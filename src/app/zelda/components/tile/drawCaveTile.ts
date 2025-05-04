import { TILE_SIZE } from './tileConstants';

export function drawCaveTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
} 
