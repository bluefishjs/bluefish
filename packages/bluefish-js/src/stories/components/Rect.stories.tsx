import type { Meta, StoryObj } from "storybook-solidjs";
import { Rect } from "../../rect";
import { Bluefish } from "../../bluefish";

/**
 * Creates a rectangle. Takes [SVGRectElement attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect#attributes)
 * as parameters.
 */
const meta: Meta<typeof Rect> = {
  title: "Components/Rect",
  component: Rect,
  tags: ["autodocs"],
  argTypes: {
    fill: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Rect>;

export const FirstStory: Story = {
  args: {
    width: 300,
    height: 200,
    x: 30,
    y: 30,
    fill: "red",
  },
  render: (props) => (
    <Bluefish width={500} height={500} positioning="absolute">
      <Rect {...props} />
    </Bluefish>
  ),
};

export const SecondStory: Story = {
  args: {
    width: 100,
    height: 100,
    x: 30,
    y: 30,
    fill: "steelblue",
  },
  render: (props) => (
    <Bluefish width={500} height={500} positioning="absolute">
      <Rect {...props} />
    </Bluefish>
  ),
};
