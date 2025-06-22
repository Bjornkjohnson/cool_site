import Link from 'next/link';

export default function SpritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-slate-950 p-4 flex gap-6 sticky top-0 z-10">
        <Link href="/sprites" className="text-white hover:text-green-400 transition-colors">
          Sprite Gallery
        </Link>
        <Link href="/sprites/interactive" className="text-white hover:text-green-400 transition-colors">
          Interactive Demo
        </Link>
        <Link href="/" className="text-white hover:text-green-400 transition-colors ml-auto">
          Back to Home
        </Link>
      </nav>
      {children}
    </div>
  );
} 
