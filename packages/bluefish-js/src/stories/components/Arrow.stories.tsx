import type { Meta, StoryObj } from "storybook-solidjs";
import { Arrow } from "../../arrow";
import { Bluefish } from "../../bluefish";
import { Rect } from "../../rect";
/**
 * Bluefish's `Arrow` component creates an arrow between two components. It uses [perfect-arrows'](https://github.com/steveruizok/perfect-arrows#options) parameters
 * in order to do so.
 */
const meta: Meta<typeof Arrow> = {
  title: "Components/Arrow",
  component: Arrow,
  tags: ["autodocs"],
  argTypes: {
    stretch: {
      control: {
        step: 0.1,
      },
    },
    bow: {
      control: {
        step: 0.1,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Arrow>;

export const ArrowComponent: Story = {
  args: {
    padStart: 5,
    padEnd: 10,
    bow: 0,
    flip: false,
    stretch: 0.1,
  },
  render: (props) => {
    return (
      <Bluefish>
        <Arrow name="arrow" {...props}>
          <Rect x={20} y={30} width={20} height={20} fill={"steelblue"} />
          <Rect x={100} y={40} width={30} height={30} fill={"steelblue"} />
        </Arrow>
      </Bluefish>
    );
  },
};
