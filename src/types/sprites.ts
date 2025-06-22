export interface SpriteMetadata {
  spriteWidth: number;
  spriteHeight: number;
  sprites: SpriteInfo[];
}

export interface SpriteInfo {
  name: string;
  file: string;
}

export type SpriteDirection = 'down' | 'up' | 'right' | 'left';
export type SpriteAction = 'walk' | 'attack' | 'idle'; 
