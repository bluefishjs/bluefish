import type { Meta, StoryObj } from "storybook-solidjs";
import { Distribute } from "../../distribute";
import { Bluefish } from "../../bluefish";
import Rect from "../../rect";

/**
 * Bluefish's `Distribute` component distributes its children across one axis. Takes parameters:
 * - `direction`: either `horizontal` or `vertical`, determines which axis to distribute its children
 * - `spacing`: determines the amount of space to put between each child
 *
 * Each child of a `Distribute` should be positioned in its other axis e.g. with an `Align` or
 * another `Distribute`.
 */
const meta: Meta<typeof Distribute> = {
  title: "Components/Distribute",
  component: Distribute,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Distribute>;

/**
 * Using `direction` = `horizontal`
 */
export const HorizontalDistribution: Story = {
  args: {
    spacing: 20,
  },
  render: (props) => {
    return (
      <Bluefish width={600} height={150}>
        <Distribute {...props} direction="horizontal">
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </Distribute>
      </Bluefish>
    );
  },
};

/**
 * Using `direction` = `vertical`
 */
export const VerticalDistribution: Story = {
  args: {
    spacing: 20,
  },
  render: (props) => {
    return (
      <Bluefish width={600} height={200}>
        <Distribute {...props} direction={"vertical"}>
          <Rect width={30} height={30} />
          <Rect width={20} height={20} />
          <Rect width={50} height={50} />
        </Distribute>
      </Bluefish>
    );
  },
};
