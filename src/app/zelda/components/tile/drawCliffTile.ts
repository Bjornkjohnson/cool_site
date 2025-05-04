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
    // Zelda-style sand/dirt color
    ctx.fillStyle = '#f8d870';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    
    // Add sand texture dots
    ctx.fillStyle = '#d8b048';
    const dotSpacing = TILE_SIZE / 8;
    for (let i = 0; i < TILE_SIZE; i += dotSpacing) {
      for (let j = 0; j < TILE_SIZE; j += dotSpacing) {
        if ((i + j) % (dotSpacing * 2) === 0) {
          ctx.fillRect(x + i, y + j, 1, 1);
        }
      }
    }
  };

  // Helper to draw classic Zelda cliff
  const drawCliff = () => {
    // Zelda cliff light green
    ctx.fillStyle = '#40a040';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    
    // Draw the pixel pattern for cliff from the original Zelda tileset
    const pixelSize = TILE_SIZE / 16; // 16x16 pixel grid
    
    // Draw darker green pattern
    ctx.fillStyle = '#008000';
    
    // Top pattern (2 rows of darker green blocks)
    for (let i = 0; i < 16; i += 2) {
      ctx.fillRect(x + i * pixelSize, y, pixelSize, pixelSize * 2);
    }
    
    // Middle horizontal lines
    for (let j = 4; j < 16; j += 4) {
      for (let i = 0; i < 16; i++) {
        ctx.fillRect(x + i * pixelSize, y + j * pixelSize, pixelSize, pixelSize);
      }
    }
    
    // Darker green vertical blocks
    for (let i = 0; i < 16; i += 4) {
      for (let j = 2; j < 16; j += 2) {
        if (j % 4 !== 0) { // Skip positions where horizontal lines are
          ctx.fillRect(x + i * pixelSize, y + j * pixelSize, pixelSize, pixelSize);
        }
      }
    }
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
