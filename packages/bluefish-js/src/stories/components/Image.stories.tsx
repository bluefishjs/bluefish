import type { Meta, StoryObj } from "storybook-solidjs";
import { Image } from "../../image";
import { Bluefish } from "../../bluefish";

/**
 * Creates an image. Takes [SVGImageElement attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image#attributes)
 * as parameters. Currently the image's width and height must be specified either by the component
 * or through a `Ref` component. They cannot be inferred from the intrinsic dimensions of the image.
 */
const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Image>;

export const FirstStory: Story = {
  args: {
    width: 100,
    height: 100,
    href: "https://bluefishjs.org/bluefish-logo.png",
  },
  render: (props) => (
    <Bluefish>
      <Image {...props} />
    </Bluefish>
  ),
};
