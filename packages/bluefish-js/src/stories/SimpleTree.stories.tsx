import type { Meta, StoryObj } from "storybook-solidjs";
import { Bluefish } from "../bluefish";
import { For, createUniqueId, mergeProps } from "solid-js";
import withBluefish, { WithBluefishProps } from "../withBluefish";
import { Group } from "../group";
import { Rect } from "../rect";
import { Ref } from "../ref";
import { Text } from "../text";
import { StackV } from "../stackv";
import { StackH } from "../stackh";
import { Arrow } from "../arrow";
import { Align } from "../align";
import { createName } from "../createName";

const meta: Meta = {
  title: "Example/SimpleTree",
};

export default meta;
type Story = StoryObj;

// Component to render Tree node
type NodeProps = WithBluefishProps<{
  value: string;
}>;

const Node = withBluefish((props: NodeProps) => {
  props = mergeProps({ value: "?" }, props);
  const valueName = createName("value");
  const outlineName = createName("outline");

  return (
    <Group>
      <Rect
        name={outlineName}
        width={50}
        height={65}
        rx={5}
        fill={"cornflowerblue"}
        stroke={"black"}
        opacity={0.5}
      />
      <Text name={valueName} font-size="24px">
        {props.value}
      </Text>
      <Align alignment="centerY">
        <Ref select={valueName} />
        <Ref select={outlineName} />
      </Align>
      <Align alignment="centerX">
        <Ref select={valueName} />
        <Ref select={outlineName} />
      </Align>
    </Group>
  );
});

// Component to render Tree
type TreeData = {
  value?: string;
  subtrees?: TreeData[];
};

type TreeProps = WithBluefishProps<TreeData>;

const Tree = withBluefish((props: TreeProps) => {
  // merge props.data with default
  props = mergeProps(
    {
      subtrees: [] as TreeData[],
      nodeId: createUniqueId(),
      value: "?",
    },
    props,
  );

  // merge props with default
  props = mergeProps({ id: createUniqueId() }, props);

  const nodeName = createName("node");

  // TODO: could probably get even fancier with this by turning objects into nested names somehow
  const subtreeNames = (props.subtrees ?? []).map((_, i) =>
    createName(`subtree${i}`),
  );

  return (
    <Group>
      <Node name={nodeName} value={props.value} />

      {props.subtrees?.length ? (
        <>
          <StackV spacing={50} alignment="centerX">
            <Ref select={nodeName} />
            <StackH alignment="centerY" spacing={50}>
              <For each={props.subtrees}>
                {(child, i) => <Tree name={subtreeNames[i()]} {...child} />}
              </For>
            </StackH>
          </StackV>
          <For each={props.subtrees}>
            {(child, i) => (
              <Arrow bow={0} stretch={0.1} flip>
                <Ref select={nodeName} />
                <Ref select={[subtreeNames[i()], "node"]} />
              </Arrow>
            )}
          </For>
        </>
      ) : null}
    </Group>
  );
});

export const TwoLevelTree: Story = {
  args: {
    value: "A",
    subtrees: [{ value: "B" }, { value: "C" }],
  },
  render: (props) => (
    <Bluefish width={500} height={500}>
      <Tree {...props} />
    </Bluefish>
  ),
};

export const ThreeLevelTree: Story = {
  args: {
    value: "A",
    subtrees: [
      {
        value: "B",
        subtrees: [{ value: "D" }, { value: "E" }],
      },
      {
        value: "C",
        subtrees: [{ value: "F" }, { value: "G" }],
      },
    ],
  },
  render: (props) => (
    <Bluefish width={500} height={500}>
      <Tree {...props} />
    </Bluefish>
  ),
};
