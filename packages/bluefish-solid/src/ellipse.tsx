import { JSX } from "solid-js/jsx-runtime";
import { Layout } from "./layout";
import { BBox, Id, Transform } from "./scenegraph";
import { splitProps } from "solid-js";
import withBluefish from "./withBluefish";

export type EllipseProps = JSX.EllipseSVGAttributes<SVGEllipseElement> & {
  name: Id;
  cx?: number;
  cy?: number;
  rx: number;
  ry: number,
};

export const Ellipse = withBluefish(
  (props: EllipseProps) => {
    const layout = () => {
      return {
        bbox: {
          left: -props.rx,
          top: -props.ry,
          width: props.rx * 2,
          height: props.ry * 2,
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
      const [_, rest] = splitProps(props, ["name", "cx", "cy", "rx", "ry"]);

      const rx = () => (paintProps.bbox.width ?? 0) / 2;
      const ry = () => (paintProps.bbox.height ?? 0)/2;

      return (
        <ellipse
          {...rest}
          cx={
            (paintProps.bbox.left ?? 0) +
            rx() +
            (paintProps.transform.translate.x ?? 0)
          }
          cy={
            (paintProps.bbox.top ?? 0) +
            ry() +
            (paintProps.transform.translate.y ?? 0)
          }
          rx={rx()}
          ry={ry()}
        />
      );
    };

    return <Layout name={props.name} layout={layout} paint={paint} />;
  },
  { displayName: "Ellipse" }
);

export default Ellipse;
