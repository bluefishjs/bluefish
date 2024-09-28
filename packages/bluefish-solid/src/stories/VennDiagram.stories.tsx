import type { Meta, StoryObj } from "storybook-solidjs";
import { Bluefish } from "../bluefish";
import withBluefish, { WithBluefishProps } from "../withBluefish";
import Group from "../group";
import Text from "../text";
import { StackH } from "../stackh";
import Background from "../background";
import Circle from "../circle";
import Ref from "../ref";

const meta: Meta = {
  title: "Example/VennDiagram",
};

export default meta;
type Story = StoryObj;

// Adding props here to allow for additions later
type VennDiagramProps = WithBluefishProps<{}>;

export const VennDiagram = withBluefish((props: VennDiagramProps) => {
  return (
    <Group
      rels={() => (
        <>
          <Background padding={10} background={() => <Circle r={55} fill="none" stroke="black" />}>
            <Ref select="objOne" />
            <Ref select="objTwo" />
          </Background>
          <Background padding={10} background={() => <Circle r={55} fill="none" stroke="black" />}>
            <Ref select="objTwo" />
            <Ref select="objThree" />
          </Background>
        </>
      )}
    >
      <StackH spacing={30} name="objects">
        <Circle name="objOne" r={10} fill="red" />
        <Circle name="objTwo" r={10} fill="purple" />
        <Circle name="objThree" r={10} fill="blue" />
      </StackH>
    </Group>
  );
});

export const VennDiagramExample: Story = {
  args: {},
  render: (props) => (
    <Bluefish width={500} height={500}>
      <VennDiagram {...props} />
    </Bluefish>
  ),
};
