import type { Meta } from '@storybook/react';
import { Bluefish } from '@bluefishjs/bluefish';
import Variable, { VariableProps } from './variable';
import { GlobalFrame, GlobalFrameProps } from './global-frame';

const meta: Meta<typeof GlobalFrame> = {
  component: GlobalFrame,
  title: 'GlobalFrame',
  argTypes: {
    variables: { control: 'array' },
  },
};
export default meta;

export const Primary = {
  args: {
    variables: [
      { name: 'x', value: '5' },
      { name: 'y', value: '7' },
      { name: 'z', value: '12' },
    ],
  },
  render: (args: GlobalFrameProps) => (
    <Bluefish id="bluefish" width={500} height={500}>
      <GlobalFrame {...args} />
    </Bluefish>
  ),
};
