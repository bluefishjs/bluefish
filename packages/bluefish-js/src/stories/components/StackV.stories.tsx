import type { Meta, StoryObj } from "storybook-solidjs";
import { StackV } from "../../stackv";
import { Bluefish } from "../../bluefish";
import Rect from "../../rect";

/**
 * `StackV` stacks its children vertically. It takes parameters:
 * - `alignment`: determines how to align the children horizontally. This should be a 1D horizontal
 *   alignment: `left`, `centerX`, or `right`.
 * - `spacing`: determines the amount of space to put between each child
 * - `total`: determines the total size of the stack in the stacking axis
 *
 * Spacing/Total Behavior:
 * - If only `spacing` is specified, each child will be placed `spacing` apart.
 * - If only `total` is specified, this spacing will be divided evenly among the children.
 * - If both `spacing` and `total` are specified, the children will be resized to fit the total
 *  size with `spacing` between them.
 */
const meta: Meta<typeof StackV> = {
  title: "Components/StackV",
  component: StackV,
  tags: ["autodocs"],
  argTypes: {
    alignment: { control: "radio", options: ["left", "centerX", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof StackV>;

export const DefinedSpacing: Story = {
  args: {
    spacing: 20,
    alignment: "centerX",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackV {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </StackV>
      </Bluefish>
    );
  },
};

export const TotalSpacing: Story = {
  args: {
    total: 110,
    alignment: "centerX",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackV {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </StackV>
      </Bluefish>
    );
  },
};

export const TotalAndSpacing: Story = {
  args: {
    spacing: 20,
    total: 100,
    alignment: "centerX",
  },
  render: (props) => {
    return (
      <Bluefish>
        <StackV {...props}>
          <Rect width={30} />
          <Rect width={20} />
          <Rect width={50} />
        </StackV>
      </Bluefish>
    );
  },
};
