import type { Meta, StoryObj } from "storybook-solidjs";
import Align from "../align";
import Arrow from "../arrow";
import Background from "../background";
import Bluefish from "../bluefish";
import Circle from "../circle";
import Distribute from "../distribute";
import Group from "../group";
import Ref from "../ref";
import Text from "../text";
import Rect from "../rect";
import { Blob } from "../blob";
import { PaperScope, Path, Point, Size } from "paper/dist/paper-core";
import { StackV } from "../stackv";
import { StackH } from "../stackh";

const meta: Meta = {
  title: "Example/Math3ma",
};

export default meta;
type Story = StoryObj;

const canvas = document.createElement("canvas");
const paperScope = new PaperScope();
paperScope.setup(canvas);
const dims = {
  x: 50,
  y: 25,
  width: 200,
  height: 100,
};
const myPath = new Path.Rectangle(
  new Point(dims.x, dims.y),
  new Size(dims.width, dims.height),
);
// const myPath = new Path();
// myPath.add(new Point(50, 75));
// myPath.add(new Point(50, 25));
// myPath.add(new Point(150, 25));
// myPath.add(new Point(150, 75));
myPath.insert(
  4,
  new Point(
    dims.x + dims.width / 2,
    dims.y + dims.height - (dims.height * 5) / 50,
  ),
);

const dims2 = {
  x: 50,
  y: 50,
  width: 100,
  height: 50,
};
const myPath2 = new Path.Rectangle(
  new Point(dims2.x, dims2.y),
  new Size(dims2.width, dims2.height),
);
myPath2.insert(
  2,
  new Point(dims2.x + dims2.width / 2, dims2.y + (dims2.height * 5) / 50),
);
myPath2.insert(
  5,
  new Point(
    dims2.x + dims2.width / 2,
    dims2.y + dims2.height - (dims2.height * 5) / 50,
  ),
);

export const Math3ma: Story = {
  name: "Math3ma",
  render: () => {
    return (
      <Bluefish width={500} height={500} padding={20}>
        <Background
          name="background"
          x={10}
          y={10}
          padding={20}
          background={() => (
            <Blob
              name="blob"
              path={myPath}
              stroke="black"
              stroke-width={3}
              fill="lightgreen"
            />
          )}
        >
          <StackH spacing={50}>
            <Background
              background={() => (
                <Blob
                  name="blob2"
                  path={myPath2}
                  stroke="black"
                  stroke-width={3}
                  fill={"palegreen"}
                />
              )}
            >
              <Text vertical-anchor="start">Borel sets</Text>
            </Background>
            <Text name="x" font-size={"20px"} vertical-anchor="start">
              x
            </Text>
          </StackH>
        </Background>
        <StackV spacing={20}>
          <Ref select="background" />
          <Text name="text" vertical-anchor="start" width={65}>
            {"f^{-1}(N) lives here!"}
          </Text>
        </StackV>
        <Arrow flip>
          <Ref select="text" />
          <Ref select="x" />
        </Arrow>
      </Bluefish>
    );
  },
};
