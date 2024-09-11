import { JSX, ParentProps, Show, mergeProps } from "solid-js";
import { Layout } from "../layout";
import _ from "lodash";
import { maybeMax, maybeMin, maybeSub } from "../util/maybe";
import { BBox, Id, Transform, ChildNode } from "../scenegraph";
import withBluefish from "../withBluefish";
import { ArrowOptions } from "perfect-arrows";

export type BondProps = ParentProps<
  {
    name: Id;
    bondType: string;
    ringCenterX?: number;
    ringCenterY?: number;
    x?: number;
    y?: number;
    start?: boolean;
    "stroke-width"?: number;
    stroke?: string;
  } & ArrowOptions
>;

export const Bond = withBluefish((props: BondProps) => {
  props = mergeProps(
    {
      bow: 0,
      stretch: 0,
      stretchMin: 40,
      stretchMax: 420,
      padStart: 0,
      padEnd: 0,
      flip: false,
      straights: true,
      "stroke-width": 3,
      stroke: "black",
    },
    props
  );

  // Returns "above" -> draw second bond above first bond
  // Returns "below" -> draw second bond below first bond
  // Lower on the page = higher Y values
  function calculateRingBondDirection(y1: any, y2: any, rCenterY: any) {
    // Check if both coordinates are above the center
    // if both coordinates are above the center, return False -> bond should be drawn below
    if (y1 < Math.floor(rCenterY) || y2 < Math.floor(rCenterY)) {
      return "below";
    } else {
      // Check if both coordinates are below the center
      // if both coordinates are below the center, return True -> bond should be drawn above
      return "above";
    }
  }

  function calculateBondAngle(x1: any, x2: any, y1: any, y2: any) {
    const changeX = Math.abs(x2 - x1) * 1.0;
    const changeY = (y1 - y2) * 1.0;
    let slope = changeY / changeX;

    let angle = Math.atan(slope);

    return angle;
  }

  const layout = (childIds: ChildNode[]) => {
    childIds = Array.from(childIds);

    if (props.name.endsWith("DEBUG")) {
      debugger;
    }

    const fromBBox = childIds[0].bbox;
    const toBBox = childIds[1].bbox;

    // just take the combined bbox of the two children
    const left = maybeMin([fromBBox.left, toBBox.left]);
    const top = maybeMin([fromBBox.top, toBBox.top]);
    const right = maybeMax([fromBBox.right, toBBox.right]);
    const bottom = maybeMax([fromBBox.bottom, toBBox.bottom]);
    const width = maybeSub(right, left);
    const height = maybeSub(bottom, top);

    // Figure out start, center, end coordinates of double bond (if applicable)
    const startX = fromBBox.centerX ?? 0;
    const startY = fromBBox.centerY ?? 0;
    const endX = toBBox.centerX ?? 0;
    const endY = toBBox.centerY ?? 0;
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;

    const bondAngle = calculateBondAngle(startX, endX, startY, endY);
    const offset = 2.5;

    // Set custom data for bonds
    let bondData;
    if (props.bondType === "-") {
      bondData = {
        sx: startX,
        sy: startY,
        cx: centerX,
        cy: centerY,
        ex: endX,
        ey: endY,
      };
    } else if (
      props.bondType === "=" &&
      !props.ringCenterX &&
      !props.ringCenterY
    ) {
      // double bond that is not part of a ring
      const sx = startX - offset * Math.sin(bondAngle);
      const ex = endX - offset * Math.sin(bondAngle);
      const sy = startY + offset * Math.cos(bondAngle);
      const ey = endY + offset * Math.cos(bondAngle);

      const sx2 = startX + offset * Math.sin(bondAngle);
      const ex2 = endX + offset * Math.sin(bondAngle);
      const sy2 = startY - offset * Math.cos(bondAngle);
      const ey2 = endY - offset * Math.cos(bondAngle);

      bondData = {
        sx: sx,
        sy: sy,
        cx: (sx + ex) / 2,
        cy: (sy + ey) / 2,
        ex: ex,
        ey: ey,
        sx2: sx2,
        sy2: sy2,
        cx2: (sx2 + ex2) / 2,
        cy2: (sy2 + ey2) / 2,
        ex2: ex2,
        ey2: ey2,
      };
    } else if (props.bondType === "=") {
      // double bond that is part of a ring
      const doubleBondDirection = calculateRingBondDirection(
        startY,
        endY,
        props.ringCenterY
      );

      const sx2 =
        doubleBondDirection === "above"
          ? startX +
            offset * 2 * Math.sin(bondAngle) -
            ((2 / 3) * offset) ** 0.5 * Math.cos(bondAngle)
          : startX +
            offset * 2 * Math.sin(bondAngle) +
            ((2 / 3) * offset) ** 0.5 * Math.cos(bondAngle);

      const ex2 =
        doubleBondDirection === "above"
          ? endX +
            offset * 2 * Math.sin(bondAngle) +
            ((2 / 3) * offset) ** 0.5 * Math.cos(bondAngle)
          : endX +
            offset * 2 * Math.sin(bondAngle) -
            ((2 / 3) * offset) ** 0.5 * Math.cos(bondAngle);

      const sy2 =
        doubleBondDirection === "above"
          ? startY -
            2 * offset * Math.cos(bondAngle) -
            ((2 / 3) * offset) ** 0.5 * Math.sin(bondAngle)
          : startY +
            2 * offset * Math.cos(bondAngle) -
            ((2 / 3) * offset) ** 0.5 * Math.sin(bondAngle);

      const ey2 =
        doubleBondDirection === "above"
          ? endY -
            2 * offset * Math.cos(bondAngle) +
            ((2 / 3) * offset) ** 0.5 * Math.sin(bondAngle)
          : endY +
            2 * offset * Math.cos(bondAngle) +
            ((2 / 3) * offset) ** 0.5 * Math.sin(bondAngle);

      bondData = {
        sx: startX,
        sy: startY,
        cx: centerX,
        cy: centerY,
        ex: endX,
        ey: endY,
        sx2: sx2,
        sy2: sy2,
        cx2: (sx2 + ex2) / 2,
        cy2: (sy2 + ey2) / 2,
        ex2: ex2,
        ey2: ey2,
      };
    }

    return {
      transform: {
        translate: {
          x: maybeSub(props.x, left),
          y: maybeSub(props.y, top),
        },
      },
      bbox: { left, top, right, bottom, width, height },
      customData: bondData,
    };
  };

  const paint = (paintProps: {
    bbox: BBox;
    transform: Transform;
    children: JSX.Element;
    customData?: any;
  }) => {
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
          {/* Single Bonds */}
          <Show when={props.bondType === "-"}>
            <path
              d={`M${paintProps.customData.sx},${paintProps.customData.sy} Q${paintProps.customData.cx},${paintProps.customData.cy} ${paintProps.customData.ex},${paintProps.customData.ey}`}
              fill="none"
              stroke={props.stroke}
              stroke-width={props["stroke-width"]}
              stroke-linecap="round"
            />
          </Show>

          {/* Double Bonds */}
          <Show when={props.bondType === "="}>
            <path
              d={`M${paintProps.customData.sx},${paintProps.customData.sy} Q${paintProps.customData.cx},${paintProps.customData.cy} ${paintProps.customData.ex},${paintProps.customData.ey}`}
              fill="none"
              stroke={props.stroke}
              stroke-width={props["stroke-width"]}
              stroke-linecap="round"
            />
            <path
              d={`M${paintProps.customData.sx2},${paintProps.customData.sy2} Q${paintProps.customData.cx2},${paintProps.customData.cy2} ${paintProps.customData.ex2},${paintProps.customData.ey2}`}
              fill="none"
              stroke={props.stroke}
              stroke-width={props["stroke-width"]}
              stroke-linecap="round"
            />
          </Show>

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
});

export default Bond;
