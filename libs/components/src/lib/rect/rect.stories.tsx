import type { Meta, StoryObj } from '@storybook/react';
import { Rect, RectProps } from './rect';
import { Bluefish } from '@bluefishjs/core';

const meta: Meta<typeof Rect> = {
  component: Rect,
  title: 'Rect',
  argTypes: {
    id: { control: 'text' },
    x: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    y: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    width: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    height: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    fill: { control: 'color' },
  },
};
export default meta;

type Story = StoryObj<typeof Rect>;
const Template: Story = {
  render: (args: RectProps) => (
    <Bluefish id="test" width={500} height={500}>
      <Rect {...args} />
    </Bluefish>
  ),
};

export const Primary = {
  ...Template,
  args: {
    id: 'rect',
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: 'red',
  },
};
