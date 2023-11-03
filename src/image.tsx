import { JSX } from "solid-js/jsx-runtime";
import { Layout } from "./layout";
import { BBox, Id, Transform } from "./scenegraph";
import { splitProps } from "solid-js";
import withBluefish from "./withBluefish";

export type ImageProps = JSX.ImageSVGAttributes<SVGImageElement> & {
  name: Id;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export const Image = withBluefish((props: ImageProps) => {
  const layout = () => {
    return {
      bbox: {
        left: 0,
        top: 0,
        width: props.width,
        height: props.height,
      },
      transform: {
        translate: {
          x: props.x,
          y: props.y,
        },
      },
    };
  };

  const paint = (paintProps: { bbox: BBox; transform: Transform }) => {
    const [_, rest] = splitProps(props, ["name", "x", "y", "width", "height"]);

    return (
      <image
        {...rest}
        x={
          (paintProps.bbox.left ?? 0) + (paintProps.transform.translate.x ?? 0)
        }
        y={(paintProps.bbox.top ?? 0) + (paintProps.transform.translate.y ?? 0)}
        width={paintProps.bbox.width}
        height={paintProps.bbox.height}
      />
    );
  };

  return <Layout name={props.name} layout={layout} paint={paint} />;
});

export default Image;
