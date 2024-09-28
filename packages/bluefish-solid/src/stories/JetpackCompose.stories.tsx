// Jetpack Compose Sleep App example from: https://developer.android.com/jetpack/compose/layouts/custom

import Align from "../align";
import Group from "../group";
import Rect from "../rect";
import Ref from "../ref";
import Distribute from "../distribute";
import withBluefish from "../withBluefish";
import Text from "../text";
import { For, ParentProps, mergeProps } from "solid-js";
import Gradient from "../gradient";
import Bluefish from "../bluefish";
import { Background, StackV, StackH } from "..";
import { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta = {
  title: "Example/JetpackCompose",
};

export default meta;
type Story = StoryObj;

const hours = [20, 21, 22, 23, 0, 1, 2];
const displayedResolutions = [{ name: "Day" }, { name: "Week", selected: true }, { name: "Month" }, { name: "6M" }];
const dayToSleepBars = [
  { day: "Sun", sleep: 7, startTime: 22, selected: true },
  { day: "Mon", sleep: 6.5, startTime: 21 },
  { day: "Tue", sleep: 8, startTime: 21 },
  { day: "Wed", sleep: 7, startTime: 21 },
  { day: "Thu", sleep: 7.2, startTime: 22 },
  { day: "Fri", sleep: 8, startTime: 22 },
  { day: "Sat", sleep: 9, startTime: 23 },
];
const sleepBarWidth = (sleepTime: number) => 50 * sleepTime;

type ComposeTextProps = ParentProps<{
  fontFamily?: string;
  fontWeight?: string;
  letterSpacing?: string;
  fontSize?: string;
  fill?: string;
  x?: number;
  y?: number;
  id?: string;
}>;

const ComposeText = withBluefish((props: ComposeTextProps) => {
  props = mergeProps(
    {
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "700",
      fontSize: "20",
      letterSpacing: "1px",
      fill: "black",
    },
    props
  );
  return (
    <Text
      font-family={props.fontFamily}
      font-weight={props.fontWeight}
      font-size={props.fontSize}
      fill={props.fill}
      letter-spacing={props.letterSpacing}
      x={props.x}
      y={props.y}
      name={props.id}
    >
      {props.children as string}
    </Text>
  );
});

// Component wrapped in a rectangle to indicate selected resolution
const SelectedResolution = withBluefish((props: { resolutionName: string }) => {
  return (
    <Group>
      <Background padding={7.5} background={() => <Rect rx="10px" stroke="#EEDFAB" fill={"None"} stroke-width={2} />}>
        <ComposeText fontSize="20">{props.resolutionName}</ComposeText>
      </Background>
    </Group>
  );
});

export const JetpackCompose: Story = {
  render: () => {
    return (
      <Bluefish id="jetpack-compose" width={1000} height={600} padding={20}>
        <StackV spacing={30}>
          <StackH spacing={100} name="resolution">
            <For each={displayedResolutions}>
              {(resolution) =>
                resolution.selected === true ? (
                  <SelectedResolution resolutionName={resolution.name} />
                ) : (
                  <ComposeText fontSize="20" fill="#717171">
                    {resolution.name}
                  </ComposeText>
                )
              }
            </For>
          </StackH>
          <Group x={0} name="main-content">
            <Gradient
              id="sleepBarGradient"
              colorOffsets={[
                { offset: 0, color: "#F1E9BC" },
                { offset: 100, color: "#f7d590" },
              ]}
              x1={0}
              x2={0}
              y1={0}
              y2={1}
            />
            <Gradient
              id="hoursBarGradient"
              colorOffsets={[
                { offset: 0, color: "#f8e7a0" },
                { offset: 100, color: "#f8d183" },
              ]}
            />

            {/* Hours */}
            <Background padding={10} background={() => <Rect fill="url(#hoursBarGradient)" rx="15px" />} name={"hours"}>
              <StackH spacing={60}>
                <For each={hours}>{(hour, ind) => <ComposeText name={`hour-${hour}`}>{hour}</ComposeText>}</For>
              </StackH>
            </Background>

            <StackV spacing={20} alignment="right" name={"sleepBarContainer"}>
              <Ref select="hours" />
              <For each={dayToSleepBars}>
                {(dayToSleepBar, ind) => (
                  <Rect
                    height={dayToSleepBar.selected === true ? 100 : 30}
                    width={sleepBarWidth(dayToSleepBar.sleep)}
                    fill="url(#sleepBarGradient)"
                    rx="10px"
                    name={`sleepBar-${ind()}`}
                  />
                )}
              </For>
            </StackV>

            <Align alignment="left" name="days">
              <For each={dayToSleepBars}>
                {(dayToSleepBar, ind) => <ComposeText name={`day-${ind()}`}>{dayToSleepBar.day}</ComposeText>}
              </For>
            </Align>

            <Distribute spacing={80} direction="horizontal">
              <Ref select="days" />
              <Ref select="hours" />
            </Distribute>

            <For each={dayToSleepBars}>
              {(dayToSleepBar, ind) => (
                <Align alignment="top">
                  <Ref select={`day-${ind()}`} />
                  <Ref select={`sleepBar-${ind()}`} />
                </Align>
              )}
            </For>
          </Group>
        </StackV>
      </Bluefish>
    );
  },
};
