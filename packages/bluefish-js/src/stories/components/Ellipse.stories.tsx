import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../../bluefish";
import Ellipse from "../../ellipse";

const meta: Meta<typeof Ellipse> = {
  title: "Components/Ellipse",
  component: Ellipse,
  tags: ["autodocs"],
  argTypes: {
    fill: { control: "color" },
    stroke: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Ellipse>;

/**
 * Creates a Ellipse. Takes [SVG's Ellipse Element Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse#attributes)
 * as parameters.
 */
export const EllipseComponent: Story = {
  args: {
    rx: 15,
    ry: 20,
    cx: 20,
    cy: 20,
    fill: "red",
    "stroke-width": 3,
    stroke: "black",
  },
  render: (props) => {
    return (
      <Bluefish width={600} height={100}>
        <Ellipse {...props} />
      </Bluefish>
    );
  },
};
