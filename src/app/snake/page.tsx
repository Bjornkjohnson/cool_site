import SnakeGame from '@/components/SnakeGame';

export default function Snake() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Snake Game</h1>
      <SnakeGame />
    </main>
  );
} 
