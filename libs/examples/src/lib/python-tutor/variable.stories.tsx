import type { Meta } from '@storybook/react';
import { Bluefish } from '@bluefishjs/bluefish';
import Variable, { VariableProps } from './variable';

const meta: Meta<typeof Variable> = {
  component: Variable,
  title: 'Variable',
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
  },
};
export default meta;

export const Primary = {
  args: {
    name: 'x',
    value: '1',
  },
  render: (args: VariableProps) => (
    <Bluefish id="bluefish" width={500} height={500}>
      <Variable {...args} />
    </Bluefish>
  ),
};
