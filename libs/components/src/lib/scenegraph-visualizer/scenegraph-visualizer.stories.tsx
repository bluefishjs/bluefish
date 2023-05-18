import type { Meta } from '@storybook/react';
import { ScenegraphVisualizer } from './scenegraph-visualizer';

const Story: Meta<typeof ScenegraphVisualizer> = {
  component: ScenegraphVisualizer,
  title: 'ScenegraphVisualizer',
};
export default Story;

export const Primary = {
  args: {},
};
