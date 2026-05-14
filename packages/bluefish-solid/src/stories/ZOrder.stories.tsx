import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Align from "../align";
import Ref from "../ref";

const meta: Meta = {
  title: "Features/ZOrder",
};

export default meta;
type Story = StoryObj;

export const DefaultOrder: Story = {
  name: "Default (declaration order)",
  render: () => (
    <Bluefish>
      <Group>
        <Rect name="r1" width={80} height={80} x={0} y={0} fill="red" />
        <Rect name="r2" width={80} height={80} x={40} y={40} fill="blue" />
      </Group>
    </Bluefish>
  ),
};

export const ReversedZOrder: Story = {
  name: "Reversed (second rect behind first)",
  render: () => (
    <Bluefish>
      <Group>
        <Rect name="r1" width={80} height={80} x={0} y={0} fill="red" />
        <Rect name="r2" width={80} height={80} x={40} y={40} fill="blue" zOrder={-1} />
      </Group>
    </Bluefish>
  ),
};

export const BringToFront: Story = {
  name: "Bring first rect to front",
  render: () => (
    <Bluefish>
      <Group>
        <Rect name="r1" width={80} height={80} x={0} y={0} fill="red" zOrder={10} />
        <Rect name="r2" width={80} height={80} x={40} y={40} fill="blue" />
        <Rect name="r3" width={80} height={80} x={20} y={20} fill="green" />
      </Group>
    </Bluefish>
  ),
};

export const MixedZOrders: Story = {
  name: "Mixed z-orders (red=2, green=1, blue=0)",
  render: () => (
    <Bluefish>
      <Group>
        <Rect name="r1" width={80} height={80} x={0} y={0} fill="red" zOrder={2} />
        <Rect name="r2" width={80} height={80} x={40} y={40} fill="blue" zOrder={0} />
        <Rect name="r3" width={80} height={80} x={20} y={20} fill="green" zOrder={1} />
      </Group>
    </Bluefish>
  ),
};
