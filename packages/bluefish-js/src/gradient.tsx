import { For } from "solid-js";
import withBluefish from "./withBluefish";
import Layout from "./layout";
import { BBox, Id, Transform } from "./scenegraph";

type ColorOffset = { offset: number; color: string };

type GradientProps = {
  name: Id;
  id: string;
  colorOffsets: ColorOffset[];
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

export const Gradient = withBluefish(
  (props: GradientProps) => {
    const layout = () => {
      return {
        bbox: {
          centerX: 0,
          centerY: 0,
          width: 0,
          height: 0,
        },
        transform: {
          translate: {},
        },
      };
    };

    const paint = (_paintProps: { bbox: BBox; transform: Transform }) => {
      return (
        <g>
          <linearGradient
            id={props.id}
            x1={props.x1}
            x2={props.x2}
            y1={props.y1}
            y2={props.y2}
          >
            <For each={props.colorOffsets}>
              {(colorOffset) => (
                <stop
                  offset={`${colorOffset.offset}%`}
                  stop-color={colorOffset.color}
                />
              )}
            </For>
          </linearGradient>
        </g>
      );
    };

    return <Layout name={props.name} layout={layout} paint={paint} />;
  },
  { displayName: "Gradient" }
);

export default Gradient;
