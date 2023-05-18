import type { Meta } from '@storybook/react';
import { Rect } from './rect';

const Story: Meta<typeof Rect> = {
  component: Rect,
  title: 'Rect',
};
export default Story;

export const Primary = {
  args: {},
};
