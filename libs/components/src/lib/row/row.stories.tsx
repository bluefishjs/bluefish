import type { Meta } from '@storybook/react';
import { Row, RowProps } from './row';
import { Bluefish } from '@bluefishjs/core';
import Rect from '../rect/rect';

const meta: Meta<typeof Row> = {
  component: Row,
  title: 'Row',
  argTypes: {
    id: { control: 'text' },
    spacing: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    x: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    y: { control: { type: 'range', min: 0, max: 300, step: 1 } },
  },
};
export default meta;

export const Primary = {
  args: {
    id: 'row',
    spacing: 5,
    x: 0,
    y: 0,
  },
  render: (args: RowProps) => (
    <Bluefish id="bluefish" width={500} height={500}>
      <Row {...args}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Rect
            key={i}
            id={`rect${i}`}
            width={50}
            height={50}
            fill="lightgreen"
          />
        ))}
      </Row>
    </Bluefish>
  ),
};
