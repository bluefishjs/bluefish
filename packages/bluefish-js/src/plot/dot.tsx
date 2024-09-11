import { For, ParentProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import withBluefish from "../withBluefish";
import Circle from "../circle";
import { usePlotContext } from "./plot";
import Group from "../group";

export type DotProps<T> = ParentProps<
  Omit<
    JSX.CircleSVGAttributes<SVGCircleElement>,
    "cx" | "cy" | "fill" | "width" | "height" | "label"
  > & {
    x: keyof T;
    y: keyof T;
    color?: keyof T;
    stroke?: keyof T;
    label?:
      | keyof T
      | {
          field: keyof T;
          avoid: Symbol[];
        };
    data?: T[];
  }
>;

export const Dot = withBluefish(<T,>(props: DotProps<T>) => {
  const plotContext = usePlotContext();

  // const resolvedX = () => plotContext.data.map((datum: any) => datum[props.x]);
  // const resolvedY = () => plotContext.data.map((datum: any) => datum[props.y]);
  // const resolvedColor = () =>
  //   plotContext.data.map((datum: any) => datum[props.color]);

  // const mappedX = () => resolvedX().map(plotContext.scales.x());
  // const mappedY = () => resolvedY().map(plotContext.scales.y());
  // const mappedColor = () => resolvedColor()?.map(plotContext.scales.color());

  return (
    <Group x={0} y={0}>
      <For each={plotContext.data}>
        {(datum) => {
          return (
            <Circle
              cx={plotContext.scales.x()(datum[props.x])}
              cy={plotContext.scales.y()(datum[props.y])}
              fill={plotContext.scales.color()(datum[props.color])}
              r={5}
            />
          );
        }}
      </For>
    </Group>
  );
});
