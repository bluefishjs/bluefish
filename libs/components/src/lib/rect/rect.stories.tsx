import type { Meta, StoryObj } from '@storybook/react';
import { Rect, RectProps } from './rect';
import { Bluefish } from '@bluefishjs/core';

const meta: Meta<typeof Rect> = {
  component: Rect,
  title: 'Rect',
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
