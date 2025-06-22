import Board from '@/components/Board';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tic Tac Toe</h1>
      <Board />
      <div className="mt-8 text-center">
        <Link 
          href="/sprites" 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors mt-4 inline-block"
        >
          View Zelda Sprites Demo
        </Link>
      </div>
    </main>
  );
}
