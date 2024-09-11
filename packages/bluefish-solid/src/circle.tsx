import { JSX } from "solid-js/jsx-runtime";
import { Layout } from "./layout";
import { BBox, Id, Transform } from "./scenegraph";
import { splitProps } from "solid-js";
import withBluefish from "./withBluefish";

export type CircleProps = JSX.CircleSVGAttributes<SVGCircleElement> & {
  name: Id;
  cx?: number;
  cy?: number;
  r: number;
};

export const Circle = withBluefish(
  (props: CircleProps) => {
    const layout = () => {
      return {
        bbox: {
          left: -props.r,
          top: -props.r,
          width: props.r * 2,
          height: props.r * 2,
        },
        transform: {
          translate: {
            x: props.cx,
            y: props.cy,
          },
        },
      };
    };

    const paint = (paintProps: { bbox: BBox; transform: Transform }) => {
      const [_, rest] = splitProps(props, ["name", "cx", "cy", "r"]);

      const r = () => (paintProps.bbox.width ?? 0) / 2;

      return (
        <circle
          {...rest}
          cx={
            (paintProps.bbox.left ?? 0) +
            r() +
            (paintProps.transform.translate.x ?? 0)
          }
          cy={
            (paintProps.bbox.top ?? 0) +
            r() +
            (paintProps.transform.translate.y ?? 0)
          }
          r={r()}
        />
      );
    };

    return <Layout name={props.name} layout={layout} paint={paint} />;
  },
  { displayName: "Circle" }
);

export default Circle;
