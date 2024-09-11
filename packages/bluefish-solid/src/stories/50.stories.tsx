import { Meta, StoryObj } from "storybook-solidjs";
import Bluefish from "../bluefish";
import Group from "../group";
import Rect from "../rect";
import Distribute from "../distribute";
import Align from "../align";
import Ref from "../ref";
import { For, createSignal } from "solid-js";
import Background from "../background";
import { StackH } from "../stackh";
import { Text } from "../text";
import Circle from "../circle";
import Arrow from "../arrow";
import { within, userEvent } from "@storybook/test";

const meta: Meta = {
  title: "Regression/#50",
};

export default meta;
type Story = StoryObj;

export const App: Story = {
  name: "#50",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
    await userEvent.click(canvas.getByRole("button"));
  },
  render: () => {
    const [count, setCount] = createSignal(0);

    return (
      <>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
        <div>
          <Bluefish>
            <StackH>
              <For each={[5, count()]}>
                {(variable) => (
                  <Rect fill="red" width={variable * 10} height={50} />
                )}
              </For>
            </StackH>
          </Bluefish>
        </div>
      </>
    );
  },
};
