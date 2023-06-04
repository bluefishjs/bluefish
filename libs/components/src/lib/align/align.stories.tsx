import type { Meta, StoryObj } from '@storybook/react';
import { Align, AlignProps, VerticalAlignment } from './align';
import Rect from '../rect/rect';
import { Bluefish, Ref } from '@bluefishjs/core';
import ScenegraphVisualizer from '../scenegraph-visualizer/scenegraph-visualizer';

const meta: Meta<typeof Align> = {
  component: Align,
  title: 'Align',
};
export default meta;

export const Simple = {
  args: {
    id: 'align',
    alignment: 'center',
    x: 0,
    y: 0,
  },
  render: (args: AlignProps) => (
    <>
      <Bluefish id="bluefish" width={500} height={500}>
        <Align {...args}>
          <Rect id="rect1" width={100} height={150} fill="steelblue" />
          <Rect id="rect2" width={50} height={50} fill="lightgreen" />
        </Align>
      </Bluefish>
      <ScenegraphVisualizer id="bluefish" />
    </>
  ),
};

export const Chained = {
  args: {
    id: 'align2',
    alignment: 'top',
  },
  render: (args: AlignProps) => (
    <Bluefish id={'ref-test'} width={1000} height={200}>
      <Align id="align1" alignment={'right'}>
        <Rect
          id="innerRect11"
          x={32}
          y={45}
          width={100}
          height={150}
          fill="steelblue"
        />
        <Rect id="innerRect21" width={50} height={50} fill="lightgreen" />
      </Align>
      <Align {...args}>
        <Ref id="ref1" refId="innerRect11" />
        <Ref id="ref2" refId="innerRect21" />
      </Align>
      <Align id="align3" alignment="center">
        <Ref id="ref3" refId="innerRect21" />
        <Rect id="innerRect31" width={20} height={30} fill="magenta" />
      </Align>
    </Bluefish>
  ),
};

export const SimpleNoNesting = {
  args: {
    id: 'align',
    alignment: 'center',
    x: 0,
    y: 0,
  },
  render: (args: AlignProps) => (
    <>
      <Bluefish id="bluefish" width={500} height={500}>
        <Rect id="rect1" width={100} height={150} fill="steelblue" />
        <Rect id="rect2" width={50} height={50} fill="lightgreen" />
        <Align {...args}>
          <Ref id="ref1" refId="rect1" />
          <Ref id="ref2" refId="rect2" />
        </Align>
      </Bluefish>
      <ScenegraphVisualizer id="bluefish" />
    </>
  ),
};
