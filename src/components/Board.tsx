'use client';

import { useState } from 'react';
import Square from './Square';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

export default function Board() {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(squares: BoardState): Player | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  function handleClick(i: number) {
    if (squares[i] || winner || isDraw) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Border logic for classic tic tac toe look
  const getBorderClasses = (i: number) => {
    let classes = '';
    if (i < 6) classes += ' border-b-4'; // bottom border except last row
    if (i % 3 !== 2) classes += ' border-r-4'; // right border except last col
    classes += ' border-black';
    return classes;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold mb-4">{status}</div>
      <div
        className="grid grid-cols-3 grid-rows-3 w-72 h-72"
        style={{ aspectRatio: '1 / 1' }}
      >
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            className={getBorderClasses(index)}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
} 
