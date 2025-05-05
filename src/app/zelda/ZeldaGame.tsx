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

// Define common tile configurations for easy reuse - all names 5 chars
const CLIFF : Tile = { type: 'cliff', variant: 'full' };
const CL_TL : Tile = { type: 'cliff', variant: 'top-left-diagonal' };
const CL_TR : Tile = { type: 'cliff', variant: 'top-right-diagonal' };
const CL_BL : Tile = { type: 'cliff', variant: 'bottom-left-diagonal' };
const CL_BR : Tile = { type: 'cliff', variant: 'bottom-right-diagonal' };
const SAND_ : Tile = { type: 'sand',  variant: 'full' };
const CAVE_ : Tile = { type: 'cave',  variant: 'full' };

// Playfield tilemap (16x11, not including HUD) - aligned for better visualization
const playfieldTilemap: Tile[][] = [
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, SAND_, SAND_, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, CAVE_, CLIFF, CL_TL, SAND_, SAND_, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CL_TL, SAND_, SAND_, SAND_, SAND_, SAND_, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CL_TL, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CL_TL, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, CL_TR, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CL_BL, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_],
  [CLIFF, CLIFF, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, CL_BR, CLIFF],
  [CLIFF, CLIFF, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, SAND_, CL_BR, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
  [CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF, CLIFF],
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
