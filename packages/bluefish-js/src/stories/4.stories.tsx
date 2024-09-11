import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Distribute from "../distribute";
import Align from "../align";
import Ref from "../ref";

const meta: Meta = {
  title: "Regression/#4",
};

export default meta;
type Story = StoryObj;

export const App: Story = {
  name: "#4",
  render: () => {
    return (
      <Bluefish id="root" debug>
        <Group name="group" y={10}>
          <Rect width={200} height={20} name="top-rect" fill="blue" x={0} />
          <Distribute name="distribute" direction="vertical" spacing={20}>
            <Rect width={100} height={20} name="rect-1" />
            <Rect width={50} height={20} name="rect-2" />
          </Distribute>
          <Align name="align" alignment="right">
            <Ref name="ref-rect-1" select="rect-1" />
            <Ref name="ref-top-rect" select="top-rect" />
          </Align>
        </Group>
      </Bluefish>
    );
  },
};
