'use client';
import React, { useRef, useEffect } from 'react';

const WIDTH = 512;
const HEIGHT = 480;
const TILE_SIZE = 32;

// Tile types
const SAND = 0;
const TREE = 1;
const CAVE = 2;

// Simple tilemap (15x15 grid for 480x480 area, with a cave at the top)
const tilemap = [
  [TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, TREE, TREE, CAVE, TREE, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE],
  [TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE],
  [SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND],
  [SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND],
  [TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE],
  [TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, SAND, SAND, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, TREE, SAND, SAND, SAND, TREE, TREE, TREE, TREE, TREE, TREE, TREE],
  [TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE, TREE],
];

export default function ZeldaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Draw tilemap
    for (let y = 0; y < tilemap.length; y++) {
      for (let x = 0; x < tilemap[y].length; x++) {
        let color = '#e9d8a6'; // sand
        if (tilemap[y][x] === TREE) color = '#228B22';
        if (tilemap[y][x] === CAVE) color = '#111';
        ctx.fillStyle = color;
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
