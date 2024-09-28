import type { Meta, StoryObj } from "storybook-solidjs";
import { Bluefish } from "../bluefish";
import withBluefish, { WithBluefishProps } from "../withBluefish";
import { Show, For, ParentProps } from "solid-js";
import Group from "../group";
import Text from "../text";
import { StackH } from "../stackh";
import Background from "../background";
import Circle from "../circle";
import Ref from "../ref";
import { StackV } from "../stackv";
import Rect from "../rect";
import { createName } from "../createName";
import Path from "../path";

const meta: Meta = {
  title: "Example/ThreePointTopologies",
};

export default meta;
type Story = StoryObj;

const Point = withBluefish(() => <Circle r={5} fill="black" />);
const EllipseBackground = withBluefish(
  (
    props: ParentProps<{
      padding: number;
    }>
  ) => (
    <Background
      padding={props.padding}
      background={() => <Rect rx={60} fill="transparent" stroke="black" stroke-width={3} />}
    >
      {props.children}
    </Background>
  )
);

const isAandCNeighbourhood = (neighbourhood: string[]) =>
  neighbourhood.length === 2 && neighbourhood.includes("a") && neighbourhood.includes("c");

// note: I drww this path in Figma by hand, exported it as SVG, then
// manually found the offsets of x: -7 and y: -10 to position it
// correctly in the bluefish diagram.
const handDrawnPathContainingAandC = {
  d: "M68.5011 48H53.0011H37.501C32.001 48 29.039 47.7419 24.001 46.02C14.431 42.76 8.50201 33.96 7.00201 31C5.50201 28.039 2.00201 19.42 2.00201 13.5C2.00201 7.58 5.15102 2 11.502 2C17.862 2 22.002 4.11 23.002 13.5C24.002 22.887 34.001 42.07 41.501 42.07H53.0011H64.5011C72.0011 42.07 82.0001 22.887 83.0001 13.5C84.0001 4.11 88.1401 2 94.5001 2C100.851 2 104 7.58 104 13.5C104 19.42 100.5 28.039 99.0001 31C97.5001 33.96 91.5711 42.76 82.0011 46.02C76.9631 47.7419 74.0011 48 68.5011 48Z",
  x: -7,
  y: -10,
};
const magicEllipsePadding = (nPointsInNeighborhood: number) => {
  // small circle around a single point, doesn't overlap the point's text label.
  if (nPointsInNeighborhood === 1) return 5;
  // ellipse large enough to contain two points and their text labels 'a', 'b' and 'c'.
  else if (nPointsInNeighborhood === 2) return 22;
  // doesn't happen in this diagram:
  else return 0;
};

const ThreePointTopology = withBluefish(
  (
    props: WithBluefishProps<{
      topology: string[][];
      showLabels?: boolean;
    }>
  ) => {
    const stack = createName("stack");
    const points: { [key: string]: string } = {
      a: createName("a"),
      b: createName("b"),
      c: createName("c"),
    };
    return (
      <Group>
        <StackH name={stack} spacing={30}>
          <Point name={points.a} />
          <Point name={points.b} />
          <Point name={points.c} />
        </StackH>

        <Show when={props.showLabels}>
          <StackV spacing={2}>
            <Ref select={points.a} />
            <Text font-style="italic">a</Text>
          </StackV>
          <StackV spacing={2}>
            <Ref select={points.b} />
            <Text font-style="italic">b</Text>
          </StackV>
          <StackV spacing={2}>
            <Ref select={points.c} />
            <Text font-style="italic">c</Text>
          </StackV>
        </Show>

        <For each={props.topology}>
          {(neighbourhood) =>
            isAandCNeighbourhood(neighbourhood) ? (
              <Path {...handDrawnPathContainingAandC} />
            ) : (
              <EllipseBackground padding={magicEllipsePadding(neighbourhood.length) / 2}>
                <For each={neighbourhood}>{(point) => <Ref select={points[point]} />}</For>
              </EllipseBackground>
            )
          }
        </For>
        <EllipseBackground padding={18}>
          <Ref select={stack} />
        </EllipseBackground>
      </Group>
    );
  }
);

// Diagram recreated in Bluefish based upon the original diagram in
// Figure 12.1 of "Topology 2nd Edition" by James Munkres
export const ThreePointTopologies = () => {
  return (
    <StackH>
      <StackV>
        <ThreePointTopology topology={[]} showLabels />
        <ThreePointTopology topology={[["b"]]} />
        <ThreePointTopology topology={[["a", "b"]]} />
      </StackV>
      <StackV>
        <ThreePointTopology topology={[["a", "b"], ["a"]]} showLabels />
        <ThreePointTopology topology={[["a", "b"], ["c"]]} />
        <ThreePointTopology topology={[["a", "b"], ["a"], ["b"]]} />
      </StackV>
      <StackV>
        <ThreePointTopology topology={[["a", "b"], ["b", "c"], ["b"]]} showLabels />
        <ThreePointTopology topology={[["a", "b"], ["b", "c"], ["b"], ["c"]]} />
        <ThreePointTopology topology={[["a", "b"], ["a", "c"], ["b", "c"], ["b"]]} />
      </StackV>
    </StackH>
  );
};

export const ThreePointTopologiesExample: Story = {
  args: {},
  render: (props) => (
    <Bluefish>
      <StackV>
        <ThreePointTopologies {...props} />
        <Text>original diagram source: Figure 12.1 of "Topology 2nd Edition" by James Munkres</Text>
      </StackV>
    </Bluefish>
  ),
};
