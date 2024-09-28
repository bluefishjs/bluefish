import type { Meta, StoryObj } from "storybook-solidjs";
import { Brownies } from "../example-gallery/brownie";
import { DFSCQLogFigure } from "../example-gallery/DFSCQ-log-figure";
import { InsertionSort } from "../example-gallery/insertion-sort";
import Bluefish from "../bluefish";
import { OhmParser } from "../example-gallery/ohm-parser";
import { PythonTutor } from "../python-tutor/python-tutor";
import { pointer } from "../python-tutor/types";
import { Pulley } from "../example-gallery/pulley";
import { QCText } from "../example-gallery/qc-text";
import { Topology } from "../example-gallery/topology";
import Arrow from "../arrow";
import Background from "../background";
import Circle from "../circle";
import Distribute from "../distribute";
import Rect from "../rect";
import Ref from "../ref";
import { StackH } from "../stackh";
import { StackV } from "../stackv";
import { Text } from "../text";
import { Align } from "../align";

const meta: Meta = {
  title: "Example/UIST Example Gallery",
};

export default meta;
type Story = StoryObj;

export const PlanetsDiagram: Story = {
  render: () => {
    return (
      <>
        {/* original */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
            <StackV spacing={30}>
              <Text name="label">Mercury</Text>
              <Ref select="mercury" />
            </StackV>
          </Background>
        </Bluefish>

        {/* change 1 */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
            <StackV spacing={30}>
              <Ref select="mercury" />
              <Text name="label">Mercury</Text>
            </StackV>
          </Background>
        </Bluefish>

        {/* change 2 */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <StackV spacing={30} name="stack">
            <Ref select="mercury" />
            <Text name="label">Mercury</Text>
          </StackV>
          <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
            <Ref select="stack" />
          </Background>
        </Bluefish>

        {/* change 3 */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <StackV spacing={30} name="stack">
            <Ref select="mercury" />
            <Text name="label">Mercury</Text>
          </StackV>
          <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
            <Ref select="mercury" />
            <Ref select="label" />
          </Background>
        </Bluefish>

        {/* change 4 */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <StackV spacing={30} name="stack">
            <Ref select="mercury" />
            <Text name="label">Mercury</Text>
          </StackV>
          <Arrow>
            <Ref select="label" />
            <Ref select="mercury" />
          </Arrow>
        </Bluefish>

        {/* change 5 */}
        <Bluefish>
          <Background padding={40} background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <Distribute direction="vertical" spacing={30}>
            <Ref select="mercury" />
            <Text name="label">Mercury</Text>
          </Distribute>
          <Align alignment="centerX">
            <Ref select="mercury" />
            <Ref select="label" />
          </Align>
          <Arrow>
            <Ref select="label" />
            <Ref select="mercury" />
          </Arrow>
        </Bluefish>

        {/* change 6 */}
        <Bluefish>
          <Background padding={40} name="planets" background={() => <Rect fill="#859fc9" />}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
              <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
              <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
              <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
            </StackH>
          </Background>
          <Distribute direction="vertical" spacing={30}>
            <Ref select="planets" />
            <Text name="label">Mercury</Text>
          </Distribute>
          <Align alignment="centerX">
            <Ref select="mercury" />
            <Ref select="label" />
          </Align>
          <Arrow>
            <Ref select="label" />
            <Ref select="mercury" />
          </Arrow>
        </Bluefish>
      </>
    );
  },
};

export const InsertionSortDiagram: Story = {
  args: {
    // unsortedArray: [43, 9, 15, 95, 5, 23, 75],
    unsortedArrayString: "[43, 9, 15, 95, 5, 23, 75]",
  },
  render: (args) => {
    try {
      const convertedArray = JSON.parse(args.unsortedArrayString).map((val: string) => +val);
      if (convertedArray.filter((val) => isNaN(val)).length > 0) {
        throw new Error("Non-numeric value in array");
      }
      return <InsertionSort unsortedArray={convertedArray} />;
    } catch {
      return <pre>Please input a valid, numeric array</pre>;
    }
  },
};

export const DFSCQLogDiagram: Story = {
  render: () => {
    return <DFSCQLogFigure />;
  },
};

export const PythonTutorDiagram: Story = {
  args: {
    stack: [
      { variable: "c", value: pointer(0) },
      { variable: "d", value: pointer(1) },
      { variable: "x", value: "5" },
    ],
    heap: [
      {
        type: "tuple",
        values: ["12", pointer(1), "1", "0", pointer(2), pointer(3)],
      },
      { type: "tuple", values: ["1", "4"] },
      { type: "tuple", values: ["3", "10", "7", "8", pointer(4)] },
      { type: "tuple", values: ["2", pointer(4)] },
      { type: "tuple", values: ["3"] },
    ],
    heapArrangement: [
      [0, 3, null, null],
      [null, 1, 2, 4],
    ],
  },
  render: (props) => (
    <Bluefish>
      <PythonTutor
        name="python-tutor"
        {...props}
        heap={props.heap}
        heapArrangement={props.heapArrangement}
        stack={props.stack}
      />
    </Bluefish>
  ),
};
export const BrownieDiagram: Story = {
  render: () => {
    return <Brownies />;
  },
};

export const PulleyDiagram: Story = {
  render: () => {
    return <Pulley />;
  },
};

export const QuantumCircuitDiagram: Story = {
  render: () => {
    return <QCText />;
  },
};

export const ThreePointSetTopologiesDiagram: Story = {
  render: () => {
    return <Topology />;
  },
};

export const OhmParserDiagram: Story = {
  args: {
    expression: "3 + (4 * 5)",
  },
  render: (args) => {
    return (
      <Bluefish>
        <OhmParser expression={args.expression} />
      </Bluefish>
    );
  },
};
