'use client';

import { useState, useEffect } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('RIGHT');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-96 h-96 bg-white rounded-lg shadow-lg p-4 flex items-center justify-center">
      <div className="grid grid-cols-20 grid-rows-20 w-80 h-80">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          
          return (
            <div
              key={index}
              className={`border border-gray-200 ${
                isSnake ? 'bg-green-500' : 'bg-white'
              }`}
              style={{ width: 16, height: 16 }}
            />
          );
        })}
      </div>
    </div>
  );
} 
