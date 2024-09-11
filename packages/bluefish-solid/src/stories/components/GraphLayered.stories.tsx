import type { Meta, StoryObj } from "storybook-solidjs";
import { Rect } from "../../rect";
import { Bluefish } from "../../bluefish";
import Arrow from "../../arrow";
import Ref from "../../ref";
import { GraphLayered, Node, Edge } from "../../graphLayered";

/**
 * Creates a layered graph using [dagre](https://github.com/dagrejs/dagre). The direction of the
 * graph can be specified as `left-right`, `right-left`, `top-bottom`, or `bottom-top`. This
 * component is best used for directed acyclic graphs (DAGs).
 *
 * Edges are specified using the `edges` prop. The names used in this prop are read off the children.
 */
const meta: Meta<typeof GraphLayered> = {
  title: "Components/GraphLayered",
  component: GraphLayered,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["left-right", "right-left", "top-bottom", "bottom-top"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GraphLayered>;

export const FirstStory: Story = {
  args: {
    direction: "left-right",
  },
  render: (props) => (
    <Bluefish>
      <GraphLayered {...props}>
        <Node id="a">
          <Rect
            name="a"
            width={144}
            height={100}
            fill="LavenderBlush"
            stroke="#aaa"
          />
        </Node>
        <Node id="b">
          <Rect
            name="b"
            width={160}
            height={100}
            fill="PeachPuff"
            stroke="#aaa"
          />
        </Node>
        <Node id="c">
          <Rect
            name="c"
            width={108}
            height={100}
            fill="LightSkyBlue"
            stroke="#aaa"
          />
        </Node>
        <Node id="d">
          <Rect
            name="d"
            width={168}
            height={100}
            fill="PaleGreen"
            stroke="#aaa"
          />
        </Node>
        <Node id="e">
          <Rect
            name="e"
            width={144}
            height={100}
            fill="Cornsilk"
            stroke="#aaa"
          />
        </Node>
        <Node id="f">
          <Rect
            name="f"
            width={121}
            height={100}
            fill="MintCream"
            stroke="#aaa"
          />
        </Node>
        <Edge source="a" target="b" />
        <Edge source="b" target="f" />
        <Edge source="c" target="f" />
        <Edge source="d" target="e" />
        <Edge source="e" target="f" />
      </GraphLayered>
      <Arrow>
        <Ref select="a" />
        <Ref select="b" />
      </Arrow>
      <Arrow>
        <Ref select="b" />
        <Ref select="f" />
      </Arrow>
      <Arrow>
        <Ref select="c" />
        <Ref select="f" />
      </Arrow>
      <Arrow>
        <Ref select="d" />
        <Ref select="e" />
      </Arrow>
      <Arrow>
        <Ref select="e" />
        <Ref select="f" />
      </Arrow>
    </Bluefish>
  ),
};
