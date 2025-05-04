'use client';
import React, { useRef, useEffect } from 'react';

const WIDTH = 512;
const HEIGHT = 480;

export default function ZeldaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Fill background black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Ready for drawing tiles and sprites
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
