'use client';

import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const directionRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(direction);

  // Keep directionRef in sync
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Move the snake
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + DIRECTIONS[directionRef.current].x,
          y: prevSnake[0].y + DIRECTIONS[directionRef.current].y,
        };
        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }
        // Move snake (no food yet, so just move head and remove tail)
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 200);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Reset handler
  const handleReset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
  };

  return (
    <div className="w-96 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center relative">
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
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-red-600 pointer-events-none">Game Over</div>
      )}
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset
      </button>
    </div>
  );
} 
