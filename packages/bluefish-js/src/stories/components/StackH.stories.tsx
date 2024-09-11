import type { Meta, StoryObj } from "storybook-solidjs";
import { StackH } from "../../stackh";
import { Bluefish } from "../../bluefish";
import Rect from "../../rect";

/**
 * `StackH` stacks its children horizontally. It takes parameters:
 * - `alignment`: determines how to align the children vertically. This should be a 1D vertical
 *   alignment: `top`, `centerY`, or `bottom`.
 * - `spacing`: determines the amount of space to put between each child
 * - `total`: determines the total size of the stack in the stacking axis
 *
 * Spacing/Total Behavior:
 * - If only `spacing` is specified, each child will be placed `spacing` apart.
 * - If only `total` is specified, this spacing will be divided evenly among the children.
 * - If both `spacing` and `total` are specified, the children will be resized to fit the total
 *  size with `spacing` between them.
 */
const meta: Meta<typeof StackH> = {
  title: "Components/StackH",
  component: StackH,
  tags: ["autodocs"],
  argTypes: {
    alignment: { control: "radio", options: ["top", "centerY", "bottom"] },
  },
};

export default meta;
type Story = StoryObj<typeof StackH>;

export const DefinedSpacing: Story = {
  args: {
    spacing: 20,
    alignment: "centerY",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackH {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </StackH>
      </Bluefish>
    );
  },
};

export const TotalSpacing: Story = {
  args: {
    total: 110,
    alignment: "centerY",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackH {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </StackH>
      </Bluefish>
    );
  },
};

export const TotalAndSpacing: Story = {
  args: {
    spacing: 20,
    total: 500,
    alignment: "centerY",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackH {...props}>
          <Rect height={30} />
          <Rect height={20} />
          <Rect height={50} />
        </StackH>
      </Bluefish>
    );
  },
};
