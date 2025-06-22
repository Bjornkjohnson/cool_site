'use client';

import { ZeldaCharacter } from "@/components/ZeldaCharacter";

export default function InteractiveDemo() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Interactive Zelda Character</h1>
      <p className="mb-8">Use arrow keys to move and space to attack</p>
      
      <div className="flex justify-center items-center bg-green-800 rounded-lg w-full h-[400px] border-4 border-green-900">
        <ZeldaCharacter controlled />
      </div>
      
      <div className="mt-8 bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Controls</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">Arrow keys: Move character</li>
          <li className="mb-2">Space: Attack</li>
        </ul>
      </div>
      
      <div className="mt-8 bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Usage Guide</h2>
        <pre className="bg-slate-950 p-4 rounded overflow-auto">
{`// Import the ZeldaCharacter component
import { ZeldaCharacter } from "@/components/ZeldaCharacter";

// Basic usage
<ZeldaCharacter />

// Interactive character with keyboard controls
<ZeldaCharacter controlled />

// Configure initial state
<ZeldaCharacter 
  initialDirection="up"  
  initialAction="idle" 
  scale={3} 
/>
`}
        </pre>
      </div>
    </div>
  );
} 
