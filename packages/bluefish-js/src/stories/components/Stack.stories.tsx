import type { Meta, StoryObj } from "storybook-solidjs";
import { Stack } from "../../stack";
import { Bluefish } from "../../bluefish";
import Rect from "../../rect";

/**
 * `Stack` combines `StackH` and `StackV` into a single component. It takes parameters:
 * - `direction`: either `horizontal` or `vertical`, determines which axis to stack its children
 * - `alignment`: determines how to align the children in the other axis. This should be a 1D align
 *   like in `Align`.
 * - `spacing`: determines the amount of space to put between each child
 * - `total`: determines the total size of the stack in the stacking axis
 *
 * Spacing/Total Behavior:
 * - If only `spacing` is specified, each child will be placed `spacing` apart.
 * - If only `total` is specified, this spacing will be divided evenly among the children.
 * - If both `spacing` and `total` are specified, the children will be resized to fit the total
 *  size with `spacing` between them.
 */
const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    alignment: { control: "radio", options: ["left", "centerX", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Horizontal: Story = {
  args: {
    spacing: 20,
    alignment: "centerY",
    direction: "horizontal",
  },
  render: (props) => {
    return (
      <Bluefish>
        <Stack {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </Stack>
      </Bluefish>
    );
  },
};

export const Vertical: Story = {
  args: {
    spacing: 20,
    alignment: "centerX",
    direction: "vertical",
  },
  render: (props) => {
    return (
      <Bluefish>
        <Stack {...props}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </Stack>
      </Bluefish>
    );
  },
};
