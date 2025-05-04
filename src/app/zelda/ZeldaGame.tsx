'use client';
import React from 'react';
import { TILE_SIZE } from './components/tile/tileConstants';
import ZeldaTile, { ZeldaTileType, ZeldaTileVariant } from './components/tile/ZeldaTile';

const TILES_WIDE = 16;
const HUD_TILES_TALL = 3;
const PLAYFIELD_TILES_TALL = 11;
const TILES_TALL = HUD_TILES_TALL + PLAYFIELD_TILES_TALL; // 15
const WIDTH = TILE_SIZE * TILES_WIDE;
const HEIGHT = TILE_SIZE * TILES_TALL;

// Define tile types explicitly as objects with type and variant
type Tile = {
  type: ZeldaTileType;
  variant: ZeldaTileVariant;
} | null; // null for empty spaces

// Define common tile configurations for easy reuse
const CLIFF_FULL: Tile = { type: 'cliff', variant: 'full' };
const CLIFF_TOP_LEFT: Tile = { type: 'cliff', variant: 'top-left-diagonal' };
const CLIFF_TOP_RIGHT: Tile = { type: 'cliff', variant: 'top-right-diagonal' };
const CLIFF_BOTTOM_LEFT: Tile = { type: 'cliff', variant: 'bottom-left-diagonal' };
const CLIFF_BOTTOM_RIGHT: Tile = { type: 'cliff', variant: 'bottom-right-diagonal' };
const SAND_TILE: Tile = { type: 'sand', variant: 'full' };
const CAVE_TILE: Tile = { type: 'cave', variant: 'full' };

// Playfield tilemap (16x11, not including HUD)
const playfieldTilemap: Tile[][] = [
  [CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CAVE_TILE, CAVE_TILE, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_TOP_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_TOP_RIGHT, CLIFF_FULL],
  [CLIFF_BOTTOM_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_BOTTOM_RIGHT, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_BOTTOM_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_BOTTOM_RIGHT, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_BOTTOM_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_BOTTOM_RIGHT, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
  [CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_BOTTOM_LEFT, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, SAND_TILE, CLIFF_BOTTOM_RIGHT, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL, CLIFF_FULL],
];

export default function ZeldaGame() {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          border: '4px solid #222',
          background: 'black',
          position: 'relative',
        }}
      >
        {/* HUD placeholder (top 3 tile rows) */}
        <div
          style={{
            width: '100%',
            height: `${HUD_TILES_TALL * TILE_SIZE}px`,
            backgroundColor: 'black',
          }}
        />
        
        {/* Playfield tilemap below HUD */}
        {playfieldTilemap.map((row, y) => (
          row.map((tile, x) => {
            if (!tile) return null;
            
            return (
              <div 
                key={`${x}-${y}`} 
                style={{ 
                  position: 'absolute',
                  left: x * TILE_SIZE,
                  top: (y + HUD_TILES_TALL) * TILE_SIZE
                }}
              >
                <ZeldaTile 
                  tileType={tile.type}
                  variant={tile.variant}
                />
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
} 
