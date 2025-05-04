'use client';
import React, { useRef, useEffect } from 'react';

const TILE_SIZE = 32;
const TILES_WIDE = 16;
const HUD_TILES_TALL = 3;
const PLAYFIELD_TILES_TALL = 11;
const TILES_TALL = HUD_TILES_TALL + PLAYFIELD_TILES_TALL; // 15
const WIDTH = TILE_SIZE * TILES_WIDE;
const HEIGHT = TILE_SIZE * TILES_TALL;

// Tile types
const SAND = 0;
const CLIFF = 1; // Green, impassable
const CAVE = 2;

// Playfield tilemap (16x11, not including HUD)
const playfieldTilemap = [
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CAVE, CAVE, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF],
  [CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF],
  [CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF],
  [CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, CLIFF, CLIFF, CLIFF, CLIFF],
];

function drawCliffTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
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

export default function ZeldaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Draw HUD placeholder (top 3 tile rows)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HUD_TILES_TALL * TILE_SIZE);
    // Draw playfield tilemap below HUD
    for (let y = 0; y < playfieldTilemap.length; y++) {
      for (let x = 0; x < playfieldTilemap[y].length; x++) {
        const drawY = (y + HUD_TILES_TALL) * TILE_SIZE;
        if (playfieldTilemap[y][x] === CLIFF) {
          drawCliffTile(ctx, x * TILE_SIZE, drawY);
        } else {
          let color = '#e9d8a6'; // sand
          if (playfieldTilemap[y][x] === CAVE) color = '#111';
          ctx.fillStyle = color;
          ctx.fillRect(x * TILE_SIZE, drawY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{
          width: WIDTH,
          height: HEIGHT,
          imageRendering: 'pixelated',
          border: '4px solid #222',
          background: 'black',
        }}
      />
    </div>
  );
} 
