import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Distribute from "../distribute";
import Align from "../align";
import Ref from "../ref";
import { createSignal } from "solid-js";
import Background from "../background";
import { StackH } from "../stackh";
import { Text } from "../text";
import Circle from "../circle";
import Arrow from "../arrow";
import { within, userEvent } from "@storybook/test";

const meta: Meta = {
  title: "Regression/#41",
};

export default meta;
type Story = StoryObj;

export const App: Story = {
  name: "#41",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
  },
  render: () => {
    const [planet, setPlanet] = createSignal("mercury");

    const handler = () => {
      if (planet() == "mercury") {
        setPlanet("venus");
      } else if (planet() == "venus") {
        setPlanet("earth");
      } else if (planet() == "earth") {
        setPlanet("mars");
      } else {
        setPlanet("mercury");
      }
    };

    return (
      <>
        <button onClick={handler}>Click Me</button>
        <div>Current planet: {planet()}</div>
        <div>
          <Bluefish>
            <Background padding={20}>
              <StackH spacing={50}>
                <Circle
                  name="mercury"
                  r={15}
                  fill="#EBE3CF"
                  stroke-width={3}
                  stroke="black"
                />
                <Circle
                  name="venus"
                  r={36}
                  fill="#DC933C"
                  stroke-width={3}
                  stroke="black"
                />
                <Circle
                  name="earth"
                  r={38}
                  fill="#179DD7"
                  stroke-width={3}
                  stroke="black"
                />
                <Circle
                  name="mars"
                  r={21}
                  fill="#F1CF8E"
                  stroke-width={3}
                  stroke="black"
                />
              </StackH>
            </Background>
            <Align alignment="centerX">
              <Text name="label">{planet()}</Text>
              <Ref select={planet()} />
            </Align>
            <Distribute direction="vertical" spacing={60}>
              <Ref select="label" />
              <Ref select={planet()} />
            </Distribute>
            <Arrow>
              <Ref select="label" />
              <Ref select={planet()} />
            </Arrow>
          </Bluefish>
        </div>
      </>
    );
  },
};
