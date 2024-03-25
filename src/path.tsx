import { mergeProps, splitProps } from "solid-js";
import Layout from "./layout";
import { BBox, Id, Transform } from "./scenegraph";
import { maybeSub } from "./util/maybe";
import { PaperScope } from "paper/dist/paper-core";
import withBluefish from "./withBluefish";
import { JSX } from "solid-js/jsx-runtime";

export type PathProps = JSX.PathSVGAttributes<SVGPathElement> & {
  name: Id;
  d: string;
  x?: number;
  y?: number;
  position?: "absolute" | "relative";
};

export const Path = withBluefish((rawProps: PathProps) => {
  const props = mergeProps(
    {
      "stroke-width": 3,
      stroke: "black",
      position: "relative",
      fill: "none",
      d: "",
    },
    rawProps
  );

  const canvas = document.createElement("canvas");
  const paperScope = new PaperScope();
  paperScope.setup(canvas);

  const layout = () => {
    const path = new paperScope.Path(props.d);
    const bounds = path.bounds;

    return {
      transform: {
        translate: {
          x: props.position === "absolute" ? 0 : maybeSub(props.x, bounds.left),
          y: props.position === "absolute" ? 0 : maybeSub(props.y, bounds.top),
        },
      },
      bbox: {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      },
      customData: {
        path,
      },
    };
  };

  const paint = (paintProps: {
    bbox: BBox;
    transform: Transform;
    customData?: { path: { pathData: string } };
  }) => {
    const [_, rest] = splitProps(props, ["name", "x", "y", "d", "position"]);

    return (
      <g
        transform={`translate(${paintProps.transform.translate.x ?? 0}, ${
          paintProps.transform.translate.y ?? 0
        })`}
      >
        <path {...rest} d={paintProps.customData?.path?.pathData ?? ""} />
      </g>
    );
  };

  return <Layout name={props.name} layout={layout} paint={paint} />;
});

export default Path;
