import { TILE_SIZE } from './tileConstants';

export function drawSandTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#e9d8a6';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
} 
