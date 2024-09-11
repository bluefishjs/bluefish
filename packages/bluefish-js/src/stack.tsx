import { withBluefish } from "./withBluefish";
import { ParentProps, JSX, mergeProps, createMemo } from "solid-js";
import { StackArgs, stackLayout } from "./stackLayout";
import { BBox, Transform, ChildNode } from "./scenegraph";
import Layout from "./layout";

export type StackProps = ParentProps<StackArgs>;

export const Stack = withBluefish(
  (props: StackProps) => {
    // if both total and spacing are undefined, default spacing to 10
    const spacing = createMemo(() => {
      if (props.total === undefined && props.spacing === undefined) return 10;
      return props.spacing;
    });

    const alignment = createMemo(() => {
      if (props.direction === "vertical") return "centerX";
      if (props.direction === "horizontal") return "centerY";
      return undefined;
    });

    props = mergeProps(
      {
        get spacing() {
          return spacing();
        },
        get alignment() {
          return alignment();
        },
      },
      props
    );

    const layout = (childNodes: ChildNode[]) => {
      return stackLayout(props)(childNodes);
    };

    const paint = (paintProps: {
      bbox: BBox;
      transform: Transform;
      children: JSX.Element;
    }) => {
      return (
        <g
          transform={`translate(${paintProps.transform.translate.x ?? 0}, ${
            paintProps.transform.translate.y ?? 0
          })`}
        >
          {paintProps.children}
        </g>
      );
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  },
  { displayName: "Stack" }
);
