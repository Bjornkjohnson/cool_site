import Board from '@/components/Board';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tic Tac Toe</h1>
      <Board />
    </main>
  );
}
