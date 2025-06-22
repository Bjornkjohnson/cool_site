import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// Define sprite dimensions and configuration
// These values are adjusted based on examining the actual sprite sheet
const SPRITE_CONFIG = {
  // Link from Legend of Zelda
  'NES - The Legend of Zelda - Link.png': {
    // Based on examining the debug grid image, we're adjusting the sprite dimensions
    spriteWidth: 10,  
    spriteHeight: 10,
    // We're no longer relying on a strict grid but using exact coordinates
    sprites: [
      // Walking animations - Down
      { name: 'link-down-0', x: 34, y: 18, width: 10, height: 10 },
      { name: 'link-down-1', x: 52, y: 18, width: 10, height: 10 },
      
      // Walking animations - Up
      { name: 'link-up-0', x: 123, y: 18, width: 10, height: 10 },
      { name: 'link-up-1', x: 141, y: 18, width: 10, height: 10 },
      
      // Walking animations - Right
      { name: 'link-right-0', x: 210, y: 18, width: 10, height: 10 },
      { name: 'link-right-1', x: 228, y: 18, width: 10, height: 10 },
      
      // Attack animations - Down
      { name: 'link-attack-down-0', x: 34, y: 52, width: 10, height: 10 },
      { name: 'link-attack-down-1', x: 52, y: 52, width: 10, height: 10 },
      
      // Attack animations - Up
      { name: 'link-attack-up-0', x: 123, y: 52, width: 10, height: 10 },
      { name: 'link-attack-up-1', x: 141, y: 52, width: 10, height: 10 },
      
      // Attack animations - Right
      { name: 'link-attack-right-0', x: 210, y: 52, width: 10, height: 10 },
      { name: 'link-attack-right-1', x: 228, y: 52, width: 10, height: 10 }
    ]
  }
};

async function sliceSprites() {
  // Process each sprite sheet defined in SPRITE_CONFIG
  for (const [filename, config] of Object.entries(SPRITE_CONFIG)) {
    console.log(`Processing ${filename}...`);
    
    const inputPath = path.join(process.cwd(), filename);
    const outputDir = path.join(process.cwd(), 'public', 'sprites');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    try {
      // Load the sprite sheet
      const image = await loadImage(inputPath);
      console.log(`Image dimensions: ${image.width}x${image.height}`);
      
      // Create a debug canvas to visualize sprite selection
      const debugCanvas = createCanvas(image.width, image.height);
      const debugCtx = debugCanvas.getContext('2d');
      debugCtx.drawImage(image, 0, 0);
      
      // Create a grid canvas with smaller grid increments
      const gridCanvas = createCanvas(image.width, image.height);
      const gridCtx = gridCanvas.getContext('2d');
      gridCtx.drawImage(image, 0, 0);
      
      // Draw a detailed grid for visual debugging
      const gridSize = 8; // 8-pixel grid
      gridCtx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      gridCtx.lineWidth = 0.5;
      
      // Draw horizontal grid lines
      for (let y = 0; y <= image.height; y += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(image.width, y);
        gridCtx.stroke();
        
        // Draw coordinate labels every 16 pixels
        if (y % 16 === 0) {
          gridCtx.fillStyle = 'white';
          gridCtx.font = '8px monospace';
          gridCtx.fillText(y.toString(), 2, y + 7);
        }
      }
      
      // Draw vertical grid lines
      for (let x = 0; x <= image.width; x += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, image.height);
        gridCtx.stroke();
        
        // Draw coordinate labels every 16 pixels
        if (x % 16 === 0) {
          gridCtx.fillStyle = 'white';
          gridCtx.font = '8px monospace';
          gridCtx.fillText(x.toString(), x + 1, 8);
        }
      }
      
      // Draw a stronger 16x16 grid overlay for sprite boundaries
      gridCtx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
      gridCtx.lineWidth = 1;
      
      // Draw horizontal major grid lines
      for (let y = 0; y <= image.height; y += 16) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(image.width, y);
        gridCtx.stroke();
      }
      
      // Draw vertical major grid lines
      for (let x = 0; x <= image.width; x += 16) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, image.height);
        gridCtx.stroke();
      }
      
      // Save grid debug image
      const gridPath = path.join(outputDir, 'debug-grid.png');
      fs.writeFileSync(gridPath, gridCanvas.toBuffer('image/png'));
      console.log(`Created debug grid: ${gridPath}`);
      
      // Process each sprite
      for (const sprite of config.sprites) {
        // Create a canvas for the individual sprite
        const canvas = createCanvas(sprite.width, sprite.height);
        const ctx = canvas.getContext('2d');
        
        console.log(`Slicing sprite ${sprite.name} from coordinates: (${sprite.x}, ${sprite.y})`);
        
        // Draw the sprite to the canvas
        ctx.drawImage(
          image,
          sprite.x, sprite.y, 
          sprite.width, sprite.height,
          0, 0, 
          sprite.width, sprite.height
        );
        
        // Save the sprite as a PNG file
        const outputPath = path.join(outputDir, `${sprite.name}.png`);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`Created sprite: ${outputPath}`);
        
        // Mark on debug image
        debugCtx.strokeStyle = 'lime';
        debugCtx.lineWidth = 1;
        debugCtx.strokeRect(sprite.x, sprite.y, sprite.width, sprite.height);
        
        // Also mark on grid image with sprite names
        gridCtx.strokeStyle = 'rgba(0, 255, 0, 1)';
        gridCtx.lineWidth = 2;
        gridCtx.strokeRect(sprite.x, sprite.y, sprite.width, sprite.height);
        
        // Add sprite name
        gridCtx.fillStyle = 'white';
        gridCtx.font = 'bold 10px Arial';
        gridCtx.fillText(sprite.name, sprite.x, sprite.y - 2);
      }
      
      // Save debug image with sprites highlighted
      const debugPath = path.join(outputDir, 'sprite-selection.png');
      fs.writeFileSync(debugPath, debugCanvas.toBuffer('image/png'));
      console.log(`Created selection debug: ${debugPath}`);
      
      // Save updated grid debug image with sprites highlighted and labeled
      const labeledGridPath = path.join(outputDir, 'debug-grid-labeled.png');
      fs.writeFileSync(labeledGridPath, gridCanvas.toBuffer('image/png'));
      console.log(`Created labeled grid debug: ${labeledGridPath}`);
      
      // Create a sprite sheet JSON file for easy reference
      const spriteData = {
        spriteWidth: config.spriteWidth,
        spriteHeight: config.spriteHeight,
        sprites: config.sprites.map(sprite => ({
          name: sprite.name,
          file: `${sprite.name}.png`
        }))
      };
      
      const jsonPath = path.join(outputDir, path.basename(filename, '.png') + '.json');
      fs.writeFileSync(jsonPath, JSON.stringify(spriteData, null, 2));
      console.log(`Created sprite metadata: ${jsonPath}`);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
}

sliceSprites().catch(console.error); 
