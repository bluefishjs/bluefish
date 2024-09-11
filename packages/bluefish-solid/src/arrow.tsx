import { JSX, ParentProps, Show, mergeProps } from "solid-js";
import { Layout } from "./layout";
import _, { get, startsWith } from "lodash";
import { maybe, maybeAdd, maybeMax, maybeMin, maybeSub } from "./util/maybe";
import { BBox, Id, Transform, ChildNode } from "./scenegraph";
import withBluefish from "./withBluefish";
import { ArrowOptions, getBoxToBoxArrow } from "perfect-arrows";

export type ArrowProps = ParentProps<
  {
    name: Id;
    x?: number;
    y?: number;
    start?: boolean;
    "stroke-width"?: number;
    stroke?: string;
  } & ArrowOptions
>;

export const Arrow = withBluefish(
  (props: ArrowProps) => {
    props = mergeProps(
      {
        bow: 0.2,
        stretch: 0.5,
        stretchMin: 40,
        stretchMax: 420,
        padStart: 5,
        padEnd: 20,
        flip: false,
        straights: true,
        "stroke-width": 3,
        stroke: "black",
      },
      props
    );
    // const { children, id } = props;

    const layout = (childIds: ChildNode[]) => {
      childIds = Array.from(childIds);

      if (props.name.endsWith("DEBUG")) {
        debugger;
      }

      const fromBBox = childIds[0].bbox;
      const toBBox = childIds[1].bbox;

      const arrow = getBoxToBoxArrow(
        fromBBox.left ?? 0,
        fromBBox.top ?? 0,
        fromBBox.width ?? 0,
        fromBBox.height ?? 0,
        toBBox.left ?? 0,
        toBBox.top ?? 0,
        toBBox.width ?? 0,
        toBBox.height ?? 0,
        props
      );

      // just take the combined bbox of the two children
      const left = maybeMin([fromBBox.left, toBBox.left]);
      const top = maybeMin([fromBBox.top, toBBox.top]);
      const right = maybeMax([fromBBox.right, toBBox.right]);
      const bottom = maybeMax([fromBBox.bottom, toBBox.bottom]);
      const width = maybeSub(right, left);
      const height = maybeSub(bottom, top);

      return {
        transform: {
          translate: {
            x: maybeSub(props.x, left),
            y: maybeSub(props.y, top),
          },
        },
        bbox: { left, top, right, bottom, width, height },
        customData: {
          sx: arrow[0],
          sy: arrow[1],
          cx: arrow[2],
          cy: arrow[3],
          ex: arrow[4],
          ey: arrow[5],
          ae: arrow[6],
          as: arrow[7],
          ec: arrow[8],
        },
      };
    };

    const paint = (paintProps: {
      bbox: BBox;
      transform: Transform;
      children: JSX.Element;
      customData?: any;
    }) => {
      const endAngleAsDegrees = () =>
        paintProps.customData.ae * (180 / Math.PI);
      const arrowHeadPoints = () => {
        const points = [
          [0, -2],
          [4, 0],
          [0, 2],
        ];

        // scale points by stroke-width
        points.forEach((point) => {
          point[0] *= props["stroke-width"]!;
          point[1] *= props["stroke-width"]!;
        });

        // stringify the points
        return points
          .map((point) => point.map((coord) => coord.toString()).join(","))
          .join(" ");
      };

      return (
        <Show
          when={paintProps.customData}
          fallback={<g>{paintProps.children}</g>}
        >
          <g
            transform={`translate(${paintProps.transform.translate.x ?? 0}, ${
              paintProps.transform.translate.y ?? 0
            })`}
          >
            <Show when={props.start} fallback={<></>}>
              <circle
                cx={paintProps.customData.sx}
                cy={paintProps.customData.sy}
                r={(4 / 3) * props["stroke-width"]!}
                fill={props.stroke}
              />
            </Show>
            <path
              d={`M${paintProps.customData.sx},${paintProps.customData.sy} Q${paintProps.customData.cx},${paintProps.customData.cy} ${paintProps.customData.ex},${paintProps.customData.ey}`}
              fill="none"
              stroke={props.stroke}
              stroke-width={props["stroke-width"]}
            />
            <polygon
              points={arrowHeadPoints()}
              transform={`translate(${paintProps.customData.ex},${
                paintProps.customData.ey
              }) rotate(${endAngleAsDegrees()})`}
              fill={props.stroke}
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
  { displayName: "Arrow" }
);

export default Arrow;
