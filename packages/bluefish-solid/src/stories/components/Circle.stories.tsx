import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../../bluefish";
import Group from "../../group";
import Circle from "../../circle";

const meta: Meta<typeof Circle> = {
  title: "Components/Circle",
  component: Circle,
  tags: ["autodocs"],
  argTypes: {
    fill: { control: "color" },
    stroke: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Circle>;

/**
 * Creates a circle. Takes [SVG's Circle Element's Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle#attributes)
 * as parameters.
 */
export const CircleComponent: Story = {
  args: {
    r: 15,
    cx: 20,
    cy: 20,
    fill: "red",
    "stroke-width": 3,
    stroke: "black",
  },
  render: (props) => {
    return (
      <Bluefish width={600} height={100}>
        <Circle {...props} />
      </Bluefish>
    );
  },
};
