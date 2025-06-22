'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SpriteProps {
  name: string;
  animate?: boolean;
  fps?: number;
  className?: string;
  scale?: number;
  onLoad?: () => void;
}

export function Sprite({
  name,
  animate = false,
  fps = 8,
  className = '',
  scale = 1,
  onLoad,
}: SpriteProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [metadata, setMetadata] = useState<{
    spriteWidth: number;
    spriteHeight: number;
    sprites: { name: string; file: string }[];
  } | null>(null);
  const [spritesInAnimation, setSpritesInAnimation] = useState<{ name: string; file: string }[]>([]);

  // Load sprite metadata
  useEffect(() => {
    fetch('/sprites/NES - The Legend of Zelda - Link.json')
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
        
        // Filter sprites related to the current animation
        const filteredSprites = data.sprites.filter((sprite: { name: string }) => 
          sprite.name.startsWith(name)
        );
        
        setSpritesInAnimation(filteredSprites);
        if (onLoad) onLoad();
      })
      .catch((err) => console.error('Error loading sprite metadata:', err));
  }, [name, onLoad]);

  // Animation loop
  useEffect(() => {
    if (!animate || spritesInAnimation.length <= 1) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % spritesInAnimation.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [animate, fps, spritesInAnimation]);

  if (!metadata || spritesInAnimation.length === 0) {
    return null;
  }

  const currentSprite = spritesInAnimation[frameIndex];
  
  return (
    <div 
      className={className}
      style={{ 
        width: metadata.spriteWidth * scale, 
        height: metadata.spriteHeight * scale 
      }}
    >
      <Image
        src={`/sprites/${currentSprite.file}`}
        alt={`Sprite ${name}`}
        width={metadata.spriteWidth * scale}
        height={metadata.spriteHeight * scale}
        priority
        style={{ 
          imageRendering: 'pixelated',
          objectFit: 'contain'
        }}
      />
    </div>
  );
} 
