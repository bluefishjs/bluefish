import { ParentProps, Show, mergeProps } from "solid-js";
import Layout from "./layout";
import withBluefish from "./withBluefish";
import _ from "lodash";
import { ChildNode } from "./scenegraph";
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
const lerp = (num: number, min: number, max: number) => min + (max - min) * num;

const maybeLerp = (c: number, a: number, b: number) =>
  a !== undefined && b !== undefined && c !== undefined ? lerp(c, a, b) : undefined;
const maybeClamp = (c: number, a: number, b: number) =>
  a !== undefined && b !== undefined && c !== undefined ? clamp(c, a, b) : undefined;
const maybeSub = (a: number, b: number) => (a !== undefined && b !== undefined ? a - b : undefined);
const maybeMin = (a: number, b: number) => (a !== undefined && b !== undefined ? Math.min(a, b) : undefined);
const maybeMax = (a: number, b: number) => (a !== undefined && b !== undefined ? Math.max(a, b) : undefined);

export type LineProps = ParentProps<{
  "stroke-width"?: number;
  "stroke-dasharray"?: string;
  stroke?: string;
  source?: number[];
  target?: number[];
}>;
export const Line = withBluefish(
  (props: LineProps) => {
    props = mergeProps(
      {
        "stroke-width": 3,
        stroke: "black",
        source: undefined,
        target: undefined,
      },
      props
    );
    // const { children, id } = props;

    const layout = (childIds: ChildNode[]) => {
      childIds = Array.from(childIds);

      const fromBBox = childIds[0].bbox;
      const toBBox = childIds[1].bbox;

      const data = {
        fromX: fromBBox.left + fromBBox.width / 2,
        fromY: fromBBox.top + fromBBox.height / 2,
        toX: toBBox.left + toBBox.width / 2,
        toY: toBBox.top + toBBox.height / 2,
      };

      let customData = {};
      if (props.source && props.target) {
        customData = {
          fromX: maybeLerp(props.source[0], fromBBox.left, fromBBox.right),
          fromY: maybeLerp(props.source[1], fromBBox.top, fromBBox.bottom),
          toX: maybeLerp(props.target[0], toBBox.left, toBBox.right),
          toY: maybeLerp(props.target[1], toBBox.top, toBBox.bottom),
        };
      } else if (props.source) {
        const fromX = maybeLerp(props.source[0], fromBBox.left, fromBBox.right);
        const fromY = maybeLerp(props.source[1], fromBBox.top, fromBBox.bottom);
        customData = {
          fromX,
          fromY,
          toX: maybeClamp(fromX, toBBox.left, toBBox.right),
          toY: maybeClamp(fromY, toBBox.top, toBBox.bottom),
        };
      } else if (props.target) {
        const toX = maybeLerp(props.target[0], toBBox.left, toBBox.right);
        const toY = maybeLerp(props.target[1], toBBox.top, toBBox.bottom);
        customData = {
          fromX: maybeClamp(toX, fromBBox.left, fromBBox.right),
          fromY: maybeClamp(toY, fromBBox.top, fromBBox.bottom),
          toX,
          toY,
        };
      } else {
        // does not necessarily produce the shortest line between two boxes.
        // produces a line from the boundary of one box to the other, biased
        // towards the center of each box's x and y axis.
        customData = {
          fromX: maybeClamp(maybeClamp(data.fromX, toBBox.left, toBBox.right), fromBBox.left, fromBBox.right),
          fromY: maybeClamp(maybeClamp(data.fromY, toBBox.top, toBBox.bottom), fromBBox.top, fromBBox.bottom),
          toX: maybeClamp(maybeClamp(data.toX, fromBBox.left, fromBBox.right), toBBox.left, toBBox.right),
          toY: maybeClamp(maybeClamp(data.toY, fromBBox.top, fromBBox.bottom), toBBox.top, toBBox.bottom),
        };
      }

      // only the bounding box of the line itself
      const left = maybeMin(customData.fromX, customData.toX);
      const top = maybeMin(customData.fromY, customData.toY);
      const right = maybeMax(customData.fromX, customData.toX);
      const bottom = maybeMax(customData.fromY, customData.toY);
      const width = maybeSub(right, left);
      const height = maybeSub(bottom, top);

      return {
        transform: {
          translate: {
            x: maybeSub(props.x, left),
            y: maybeSub(props.y, top),
          },
        },
        bbox: { left, top, width, height },
        customData: customData,
      };
    };

    /*
          {
            bbox: BBox;
            transform: Transform;
            children: JSX.Element;
            customData?: any;
          }
          */
    const paint = (paintProps) => {
      return (
        <Show when={paintProps.customData} fallback={<g>{paintProps.children}</g>}>
          <g
            transform={`translate(${paintProps.transform.translate.x ?? 0}, ${paintProps.transform.translate.y ?? 0})`}
          >
            <line
              x1={paintProps.customData.fromX}
              x2={paintProps.customData.toX}
              y1={paintProps.customData.fromY}
              y2={paintProps.customData.toY}
              stroke={props.stroke}
              stroke-width={props["stroke-width"]}
              stroke-dasharray={props["stroke-dasharray"]}
            />
            {paintProps.children}
          </g>
        </Show>
      );
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  },
  { displayName: "Line" }
);

export default Line;
