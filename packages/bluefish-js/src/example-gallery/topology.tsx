
import { Show, For } from "solid-js";
import Background from "../background.jsx";
import Bluefish from "../bluefish.jsx";
import Circle from "../circle.jsx";
import { createName } from "../createName.jsx";
import Group from "../group.jsx";
import Rect from "../rect.jsx";
import Ref from "../ref.jsx";
import { StackH } from "../stackh.jsx";
import { StackV } from "../stackv.jsx";
import withBluefish from "../withBluefish.jsx";
import { Path } from "./path.js";
import Text from "../text.jsx";

const TOPOLOGY_COLOR = [
  "#ff2400", // shade of red
  "#009dff", // shade of blue
  "yellow",
  "orange",
  "green",
  "purple",
];
const TOPOLOGY_OPACITY = 0.5;

const PathContainAandC =
  "M68.5011 48H53.0011H37.501C32.001 48 29.039 47.7419 24.001 46.02C14.431 42.76 8.50201 33.96 7.00201 31C5.50201 28.039 2.00201 19.42 2.00201 13.5C2.00201 7.58 5.15102 2 11.502 2C17.862 2 22.002 4.11 23.002 13.5C24.002 22.887 34.001 42.07 41.501 42.07H53.0011H64.5011C72.0011 42.07 82.0001 22.887 83.0001 13.5C84.0001 4.11 88.1401 2 94.5001 2C100.851 2 104 7.58 104 13.5C104 19.42 100.5 28.039 99.0001 31C97.5001 33.96 91.5711 42.76 82.0011 46.02C76.9631 47.7419 74.0011 48 68.5011 48Z";
const Point = withBluefish(() => <Circle r={5} fill="black"></Circle>);
const EllipseBackground = withBluefish((props) => {
  return (
    <Background
      padding={props.padding}
      background={() => (
        <Rect
          rx="60"
          fill={props.fill ?? "none"}
          stroke="black"
          stroke-width="3"
          opacity={props.opacity ?? 1}
        ></Rect>
      )}
    >
      {props.children}
    </Background>
  );
});
const isAandCNeighbourhood = (neighbourhood) =>
  neighbourhood.length === 2 &&
  neighbourhood.includes("a") &&
  neighbourhood.includes("c");

const ThreePointTopology = withBluefish((props) => {
  const stack = createName("stack");
  const points = {
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

      <Show when={props.topology.some(isAandCNeighbourhood)}>
        <Path
          d={PathContainAandC}
          x={-7}
          y={-10}
          fill={props.overdraw ? "none" : TOPOLOGY_COLOR[4]}
          opacity={props.overdraw ? 1 : TOPOLOGY_OPACITY}
        />
      </Show>
      <For each={props.topology}>
        {(neighbourhood, index) =>
          isAandCNeighbourhood(neighbourhood) ? null : (
            <EllipseBackground
              padding={neighbourhood.length * 17 - 12}
              opacity={props.overdraw ? 1 : TOPOLOGY_OPACITY}
              fill={props.overdraw ? "none" : TOPOLOGY_COLOR[index() % 6]}
            >
              <For each={neighbourhood}>
                {(point) => <Ref select={points[point]} />}
              </For>
            </EllipseBackground>
          )
        }
      </For>
      <EllipseBackground padding={36} overdraw={props.overdraw}>
        <Ref select={stack} />
      </EllipseBackground>
    </Group>
  );
});

export const Topology = () => {
  return (
    <Bluefish>
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
          <ThreePointTopology
            topology={[["a", "b"], ["b", "c"], ["b"]]}
            showLabels
          />
          <ThreePointTopology
            topology={[["a", "b"], ["b", "c"], ["b"], ["c"]]}
          />
          <ThreePointTopology
            topology={[["a", "b"], ["b", "c"], ["b"], ["a", "c"]]}
          />
        </StackV>
      </StackH>
      <StackH>
        <StackV>
          <ThreePointTopology topology={[]} showLabels overdraw />
          <ThreePointTopology topology={[["b"]]} overdraw />
          <ThreePointTopology topology={[["a", "b"]]} overdraw />
        </StackV>
        <StackV>
          <ThreePointTopology
            topology={[["a", "b"], ["a"]]}
            showLabels
            overdraw
          />
          <ThreePointTopology topology={[["a", "b"], ["c"]]} overdraw />
          <ThreePointTopology topology={[["a", "b"], ["a"], ["b"]]} overdraw />
        </StackV>
        <StackV>
          <ThreePointTopology
            topology={[["a", "b"], ["b", "c"], ["b"]]}
            showLabels
            overdraw
          />
          <ThreePointTopology
            topology={[["a", "b"], ["b", "c"], ["b"], ["c"]]}
            overdraw
          />
          <ThreePointTopology
            topology={[["a", "b"], ["a", "c"], ["b", "c"], ["b"]]}
            overdraw
          />
        </StackV>
      </StackH>
    </Bluefish>
  );
};
