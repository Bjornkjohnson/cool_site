import React, { useEffect, useRef } from 'react';
import { TILE_SIZE } from './tileConstants';

// Define tile types based on the Zelda tileset
export type ZeldaTileType = 
  | 'cliff'
  | 'sand'
  | 'cave'
  | 'water'
  | 'tree';

// Define variants for each tile type
export type ZeldaTileVariant = 
  | 'full'
  | 'top-left-diagonal'
  | 'top-right-diagonal'
  | 'bottom-left-diagonal'
  | 'bottom-right-diagonal';

// Define color schemes
export type ZeldaColorScheme = 
  | 'gray'
  | 'orange'
  | 'green'
  | 'orange-blue';

// Map color schemes to offset coordinates
const COLOR_SCHEME_OFFSETS: Record<ZeldaColorScheme, [number, number]> = {
  'gray': [0, 0],
  'orange': [8, 0],
  'green': [16, 0],
  'orange-blue': [24, 0]
};

interface ZeldaTileProps {
  tileType: ZeldaTileType;
  variant?: ZeldaTileVariant;
  scale?: number;
  colorOffsetX?: number; // X offset for different color schemes
  colorOffsetY?: number; // Y offset for different color schemes
  colorScheme?: ZeldaColorScheme; // Named color scheme (overrides colorOffsetX/Y if provided)
}

// Map of tile coordinates in the tileset image (x, y position in units of 16x16 pixels)
const TILESET_COORDINATES: Record<ZeldaTileType, Partial<Record<ZeldaTileVariant, [number, number]>>> = {
  cliff: {
    'full': [6.06, 6.687],
    'top-left-diagonal': [7.06, 6.687],
    'top-right-diagonal': [5.29, 6.687],
    'bottom-left-diagonal': [5.29, 6.687], // Using same coordinates as top-right
    'bottom-right-diagonal': [7.06, 6.687]
  },
  sand: {
    'full': [1.06, 1.687]
    // Sand only has 'full' variant
  },
  cave: {
    'full': [0.06, 2.687]
    // Cave only has 'full' variant
  },
  water: {
    'full': [1.06, 1.687]
    // Water only has 'full' variant
  },
  tree: {
    'full': [10, 0]
    // Tree only has 'full' variant
  }
};

// Define which variants need rotation
const ROTATED_VARIANTS: Partial<Record<ZeldaTileVariant, number>> = {
  'bottom-left-diagonal': 180, // Rotate 180 degrees
  'bottom-right-diagonal': 180 // Rotate 180 degrees
};

// The size of each tile in the original PNG
const ORIGINAL_TILE_SIZE = 16;

// Define tiles that need special rendering
const SPECIAL_TILES: Record<string, (ctx: CanvasRenderingContext2D, image: HTMLImageElement, tileX: number, tileY: number) => void> = {
  // Sand uses only the upper right quadrant and expands it to fill the entire tile
  'sand-full': (ctx, image, tileX, tileY) => {
    // Instead of cropping, let's use a solid color fill for sand
    // From the original image, get a sample point to determine the color
    const sampleX = Math.floor(tileX * ORIGINAL_TILE_SIZE + ORIGINAL_TILE_SIZE * 0.75); // Sample from center of right half
    const sampleY = Math.floor(tileY * ORIGINAL_TILE_SIZE + ORIGINAL_TILE_SIZE * 0.25); // Sample from center of top half
    
    // Create a temporary canvas to sample the color
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Draw the image to the temp canvas
    tempCtx.drawImage(image, 0, 0);
    
    // Get the color data at the sample point
    try {
      const pixelData = tempCtx.getImageData(sampleX, sampleY, 1, 1).data;
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      
      // Fill the entire tile with this color
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    } catch {
      // If we can't get the color data (e.g., CORS issues), fall back to a default sand color
      ctx.fillStyle = '#f8d870'; // Default sand color
      ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    }
  },
  
  // Water uses only the bottom right quadrant and expands it to fill the entire tile
  'water-full': (ctx, image, tileX, tileY) => {
    // From the original image, get a sample point to determine the color
    const sampleX = Math.floor(tileX * ORIGINAL_TILE_SIZE + ORIGINAL_TILE_SIZE * 0.75); // Sample from center of right half
    const sampleY = Math.floor(tileY * ORIGINAL_TILE_SIZE + ORIGINAL_TILE_SIZE * 0.75); // Sample from center of bottom half
    
    // Create a temporary canvas to sample the color
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Draw the image to the temp canvas
    tempCtx.drawImage(image, 0, 0);
    
    // Get the color data at the sample point
    try {
      const pixelData = tempCtx.getImageData(sampleX, sampleY, 1, 1).data;
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      
      // Fill the entire tile with this color - water blue
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
      
      // Draw a few horizontal wave lines
      for (let y = 4; y < TILE_SIZE; y += 8) {
        for (let x = 0; x < TILE_SIZE; x += 4) {
          // Skip some pixels to create a broken line effect
          if (Math.random() > 0.7) {
            ctx.fillRect(x, y, 2, 1);
          }
        }
      }
    } catch {
      // If we can't get the color data, fall back to a default water color
      ctx.fillStyle = '#0099ff'; // Default water color
      ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    }
  }
};

const ZeldaTile: React.FC<ZeldaTileProps> = ({ 
  tileType, 
  variant = 'full',
  scale = 1,
  colorOffsetX = 0,
  colorOffsetY = 0,
  colorScheme = 'gray'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Load the tileset image
    const tilesetImage = new Image();
    tilesetImage.src = '/NES - The Legend of Zelda - Overworld Tileset.png';
    
    tilesetImage.onload = () => {
      // Check if requested variant exists for this tile type, fallback to 'full' if not
      const effectiveVariant = TILESET_COORDINATES[tileType][variant] ? variant : 'full';
      
      // Get the coordinates for the requested tile
      const [tileX, tileY] = TILESET_COORDINATES[tileType][effectiveVariant] as [number, number];
      
      // Apply color scheme offset - prioritize named colorScheme if provided
      let finalOffsetX = colorOffsetX;
      let finalOffsetY = colorOffsetY;
      
      if (colorScheme) {
        [finalOffsetX, finalOffsetY] = COLOR_SCHEME_OFFSETS[colorScheme];
      }
      
      const offsetTileX = tileX + finalOffsetX;
      const offsetTileY = tileY + finalOffsetY;
      
      // Check if this is a special tile that needs custom rendering
      const specialKey = `${tileType}-${effectiveVariant}`;
      if (SPECIAL_TILES[specialKey]) {
        SPECIAL_TILES[specialKey](ctx, tilesetImage, offsetTileX, offsetTileY);
        return;
      }
      
      // Check if this variant needs rotation
      const rotation = ROTATED_VARIANTS[effectiveVariant];
      
      // Trim amount (only from bottom and right)
      const trimRight = 0.2;
      const trimBottom = 0.2;
      
      if (rotation) {
        // If we need to rotate, we'll need to adjust our drawing approach
        ctx.save();
        
        // Move to center of canvas, rotate, then move back
        ctx.translate(TILE_SIZE / 2, TILE_SIZE / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);
        
        // Draw the rotated tile with trimmed bottom and right edges
        ctx.drawImage(
          tilesetImage,
          offsetTileX * ORIGINAL_TILE_SIZE,
          offsetTileY * ORIGINAL_TILE_SIZE,
          ORIGINAL_TILE_SIZE - trimRight,
          ORIGINAL_TILE_SIZE - trimBottom,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
        
        ctx.restore();
      } else {
        // Draw normal (unrotated) tile with trimmed bottom and right edges
        ctx.drawImage(
          tilesetImage,
          offsetTileX * ORIGINAL_TILE_SIZE,
          offsetTileY * ORIGINAL_TILE_SIZE,
          ORIGINAL_TILE_SIZE - trimRight,
          ORIGINAL_TILE_SIZE - trimBottom,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    };
  }, [tileType, variant, colorOffsetX, colorOffsetY, colorScheme]);
  
  return (
    <canvas
      ref={canvasRef}
      width={TILE_SIZE}
      height={TILE_SIZE}
      style={{
        width: TILE_SIZE * scale,
        height: TILE_SIZE * scale,
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default ZeldaTile; 
