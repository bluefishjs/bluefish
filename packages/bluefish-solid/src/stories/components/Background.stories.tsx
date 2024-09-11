import type { Meta, StoryObj } from "storybook-solidjs";
import { Background } from "../../background";
import { Bluefish } from "../../bluefish";
import { Text } from "../../text";
import { StackH } from "../../stackh";
import Rect from "../../rect";

/**
 * Bluefish's `Background` component creates a background around a set of children elements. The background element's sizing will be inferred from that
 * of the children components.
 *
 * It takes in the following params:
 * - `background`: What the background should be. Should be of type `(() => JSX.Element) | undefined`. Defaults to a rectangle
 * with no fill and black borders
 * - `padding`: How much padding should be placed around the children elements
 */
const meta: Meta = {
  title: "Components/Background",
  component: Background,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Background>;

export const BackgroundComponent: Story = {
  args: {
    padding: 20,
  },
  render: (props) => {
    return (
      <Bluefish width={600} height={150}>
        <Background
          {...props}
          background={() => {
            return <Rect fill={"steelblue"} />;
          }}
        >
          <Text>I have a background!</Text>
        </Background>
      </Bluefish>
    );
  },
};
