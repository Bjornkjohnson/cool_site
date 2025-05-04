import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { drawCliffTile, CliffTileVariant } from './drawCliffTile';
import { drawSandTile } from './drawSandTile';
import { drawCaveTile } from './drawCaveTile';
import { TILE_SIZE } from './tileConstants';

const meta = {
  title: 'Zelda/Tiles',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TileCanvas = ({ drawTile }: { drawTile: (ctx: CanvasRenderingContext2D, x: number, y: number) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
    // Draw the tile
    drawTile(ctx, 0, 0);
  }, [drawTile]);

  return (
    <canvas
      ref={canvasRef}
      width={TILE_SIZE}
      height={TILE_SIZE}
      style={{
        width: TILE_SIZE * 2,
        height: TILE_SIZE * 2,
        imageRendering: 'pixelated',
        border: '2px solid #222',
      }}
    />
  );
};

function makeCliffTileStory(variant: CliffTileVariant) {
  return {
    render: () => <TileCanvas drawTile={(ctx, x, y) => drawCliffTile(ctx, x, y, variant)} />,
  };
}

export const CliffTileFull: Story = makeCliffTileStory('full');
export const CliffTileTopLeftDiagonal: Story = makeCliffTileStory('top-left-diagonal');
export const CliffTileTopRightDiagonal: Story = makeCliffTileStory('top-right-diagonal');
export const CliffTileBottomLeftDiagonal: Story = makeCliffTileStory('bottom-left-diagonal');
export const CliffTileBottomRightDiagonal: Story = makeCliffTileStory('bottom-right-diagonal');

export const SandTile: Story = {
  render: () => <TileCanvas drawTile={drawSandTile} />,
};

export const CaveTile: Story = {
  render: () => <TileCanvas drawTile={drawCaveTile} />,
}; 
