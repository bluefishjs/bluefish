import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Distribute from "../distribute";
import Align from "../align";
import Ref from "../ref";
import { createSignal } from "solid-js";
import Background from "../background";
import { StackH } from "../stackh";
import { Text } from "../text";
import Circle from "../circle";
import Arrow from "../arrow";

const meta: Meta = {
  title: "Regression/#44",
};

export default meta;
type Story = StoryObj;

export const App: Story = {
  name: "#44",
  render: () => {
    return (
      <Bluefish>
        <Distribute direction="vertical" spacing={20}>
          <StackH spacing={200}>
            <Rect name="left" width={100} height={200} fill="magenta" />
            <Rect name="right" width={100} height={100} fill="green" />
          </StackH>
          <Rect name="test" height={100} fill="black" />
        </Distribute>
        <Align alignment="left">
          <Ref select="left" />
          <Ref select="test" />
        </Align>
        <Align alignment="right">
          <Ref select="right" />
          <Ref select="test" />
        </Align>
      </Bluefish>
    );
  },
};
