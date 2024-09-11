import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Distribute from "../distribute";
import Text from "../text";
import Align from "../align";
import Ref from "../ref";

const meta: Meta = {
  title: "Regression/#6",
};

export default meta;
type Story = StoryObj;

export const A: Story = {
  name: "#6/a",
  render: () => {
    return (
      <Bluefish width={500} height={200}>
        <Distribute direction="horizontal" spacing={20}>
          <Group x={0} y={0}>
            <Text>one</Text>
            <Text>two</Text>
          </Group>
          <Text>three</Text>
        </Distribute>
      </Bluefish>
    );
  },
};

export const B: Story = {
  name: "#6/b",
  render: () => {
    return (
      <Bluefish width={500} height={200}>
        <Distribute direction="horizontal" spacing={50}>
          <Group x={0} y={0}>
            <Rect width={30} height={20} />
          </Group>
          <Rect width={30} height={20} fill={"red"} />
        </Distribute>
      </Bluefish>
    );
  },
};
