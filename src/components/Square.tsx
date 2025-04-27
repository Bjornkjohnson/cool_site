'use client';

interface SquareProps {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
  className?: string;
}

export default function Square({ value, onSquareClick, className = '' }: SquareProps) {
  return (
    <button
      className={`w-full h-full text-5xl font-bold flex items-center justify-center focus:outline-none transition-colors ${className}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
} 
