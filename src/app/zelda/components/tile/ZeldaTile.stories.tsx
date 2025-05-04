import type { Meta, StoryObj } from '@storybook/react';
import ZeldaTile, { ZeldaTileType, ZeldaTileVariant } from './ZeldaTile';

const meta = {
  title: 'Zelda/ZeldaTiles',
  component: ZeldaTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tileType: {
      control: 'select',
      options: ['cliff', 'sand', 'cave', 'water', 'tree'],
    },
    variant: {
      control: 'select',
      options: ['full', 'top-left-diagonal', 'top-right-diagonal', 'bottom-left-diagonal', 'bottom-right-diagonal'],
    },
    scale: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
} satisfies Meta<typeof ZeldaTile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create stories for each tile type and variant
function createTileStory(tileType: ZeldaTileType, variant: ZeldaTileVariant): Story {
  return {
    name: `${tileType.charAt(0).toUpperCase() + tileType.slice(1)}-${variant}`,
    args: {
      tileType,
      variant,
      scale: 4,
    },
  };
}

// Cliff Tiles
export const CliffFull = createTileStory('cliff', 'full');
export const CliffTopLeftDiagonal = createTileStory('cliff', 'top-left-diagonal');
export const CliffTopRightDiagonal = createTileStory('cliff', 'top-right-diagonal');
export const CliffBottomLeftDiagonal = createTileStory('cliff', 'bottom-left-diagonal');
export const CliffBottomRightDiagonal = createTileStory('cliff', 'bottom-right-diagonal');

// Sand Tiles
export const SandFull = createTileStory('sand', 'full');

// Cave Tiles
export const CaveFull = createTileStory('cave', 'full');

// Water Tiles
export const WaterFull = createTileStory('water', 'full');

// Tree Tiles
export const TreeFull = createTileStory('tree', 'full');

// Tile Grid Example
export const TileGrid: Story = {
  args: {
    tileType: 'cliff',
    variant: 'full',
    scale: 3
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
      <ZeldaTile tileType="cliff" variant="full" scale={3} />
      <ZeldaTile tileType="sand" variant="full" scale={3} />
      <ZeldaTile tileType="water" variant="full" scale={3} />
      <ZeldaTile tileType="cave" variant="full" scale={3} />
      <ZeldaTile tileType="tree" variant="full" scale={3} />
      
      <ZeldaTile tileType="cliff" variant="top-left-diagonal" scale={3} />
      <ZeldaTile tileType="cliff" variant="top-right-diagonal" scale={3} />
      <ZeldaTile tileType="cliff" variant="bottom-left-diagonal" scale={3} />
      <ZeldaTile tileType="cliff" variant="bottom-right-diagonal" scale={3} />
      <ZeldaTile tileType="sand" variant="full" scale={3} />
    </div>
  ),
}; 
