import { Sprite } from "@/components/Sprite";

export default function SpritesDemo() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Zelda Sprites Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Static Sprites</h2>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <Sprite name="link-down" scale={4} />
              <p className="mt-2">Link Down</p>
            </div>
            <div className="text-center">
              <Sprite name="link-up" scale={4} />
              <p className="mt-2">Link Up</p>
            </div>
            <div className="text-center">
              <Sprite name="link-right" scale={4} />
              <p className="mt-2">Link Right</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-down" scale={4} />
              <p className="mt-2">Attack Down</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-up" scale={4} />
              <p className="mt-2">Attack Up</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-right" scale={4} />
              <p className="mt-2">Attack Right</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Animated Sprites</h2>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <Sprite name="link-down" animate scale={4} />
              <p className="mt-2">Walk Down</p>
            </div>
            <div className="text-center">
              <Sprite name="link-up" animate scale={4} />
              <p className="mt-2">Walk Up</p>
            </div>
            <div className="text-center">
              <Sprite name="link-right" animate scale={4} />
              <p className="mt-2">Walk Right</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-down" animate scale={4} />
              <p className="mt-2">Attack Down</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-up" animate scale={4} />
              <p className="mt-2">Attack Up</p>
            </div>
            <div className="text-center">
              <Sprite name="link-attack-right" animate scale={4} />
              <p className="mt-2">Attack Right</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Usage Guide</h2>
        <pre className="bg-slate-950 p-4 rounded overflow-auto">
{`// Import the Sprite component
import { Sprite } from "@/components/Sprite";

// Basic usage
<Sprite name="link-down" />

// Animated
<Sprite name="link-down" animate />

// Custom size (scales the pixel art)
<Sprite name="link-down" scale={4} />

// Animation speed (frames per second)
<Sprite name="link-down" animate fps={12} />`}
        </pre>
      </div>
    </div>
  );
} 
