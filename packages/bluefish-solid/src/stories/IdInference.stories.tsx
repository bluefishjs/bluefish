import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Ref from "../ref";
import withBluefish from "../withBluefish";
import { StackH } from "../stackh";
import { StackV } from "../stackv";

const meta: Meta = {
  title: "Feat/Id Inference",
};

export default meta;
type Story = StoryObj;

const CustomComponent = withBluefish(() => {
  return <Rect width={100} height={30} />;
});

export const App: Story = {
  name: "Id Inference",
  render: () => {
    return (
      <Bluefish>
        <Group x={0} y={0}>
          <StackH>
            <Rect width={200} height={20} fill="blue" x={0} />
            <CustomComponent name="custom" />
          </StackH>
          <StackV>
            <Ref select="custom" />
            <Rect width={100} height={20} fill="magenta" />
          </StackV>
        </Group>
      </Bluefish>
    );
  },
};
