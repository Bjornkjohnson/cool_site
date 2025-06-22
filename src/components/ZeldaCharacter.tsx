import { useState, useEffect } from 'react';
import { Sprite } from './Sprite';
import type { SpriteDirection, SpriteAction } from '@/types/sprites';

interface CharacterProps {
  initialDirection?: SpriteDirection;
  initialAction?: SpriteAction;
  scale?: number;
  className?: string;
  controlled?: boolean;
}

export function ZeldaCharacter({
  initialDirection = 'down',
  initialAction = 'idle',
  scale = 4,
  className = '',
  controlled = false,
}: CharacterProps) {
  const [direction, setDirection] = useState<SpriteDirection>(initialDirection);
  const [action, setAction] = useState<SpriteAction>(initialAction);
  const [isAttacking, setIsAttacking] = useState(false);

  // Handle keyboard controls
  useEffect(() => {
    if (!controlled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('up');
          setAction('walk');
          break;
        case 'ArrowDown':
          setDirection('down');
          setAction('walk');
          break;
        case 'ArrowLeft':
          setDirection('right'); // We'll flip this with CSS
          setAction('walk');
          break;
        case 'ArrowRight':
          setDirection('right');
          setAction('walk');
          break;
        case ' ': // Space
          if (!isAttacking) {
            setIsAttacking(true);
            setAction('attack');
            
            // Reset after attack animation
            setTimeout(() => {
              setIsAttacking(false);
              setAction('idle');
            }, 500);
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
        !isAttacking
      ) {
        setAction('idle');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [controlled, isAttacking]);

  // Determine which sprite to show
  const getSpriteName = () => {
    if (action === 'attack') {
      return `link-attack-${direction}`;
    }
    return `link-${direction}`;
  };

  return (
    <div 
      className={`${className} ${direction === 'left' ? 'scale-x-[-1]' : ''}`}
    >
      <Sprite 
        name={getSpriteName()} 
        animate={action !== 'idle'} 
        scale={scale} 
        fps={8}
      />
    </div>
  );
} 
