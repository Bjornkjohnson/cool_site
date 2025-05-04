import type { Meta, StoryObj } from '@storybook/react';
import Square from './Square';

const meta = {
  title: 'TicTacToe/Square',
  component: Square,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['X', 'O', null],
    },
    onSquareClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: null,
    onSquareClick: () => {},
  },
};

export const X: Story = {
  args: {
    value: 'X',
    onSquareClick: () => {},
  },
};

export const O: Story = {
  args: {
    value: 'O',
    onSquareClick: () => {},
  },
};

export const WithBorder: Story = {
  args: {
    value: 'X',
    onSquareClick: () => {},
    className: 'border-b-4 border-r-4 border-black',
  },
}; 
