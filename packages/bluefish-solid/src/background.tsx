import _ from "lodash";
import Layout from "./layout";
import { BBox, ChildNode, Id, Transform } from "./scenegraph";
import { JSX } from "solid-js/jsx-runtime";
import { ParentProps, Show, mergeProps, splitProps } from "solid-js";
import { maybeAdd, maybeMax, maybeMin, maybeSub } from "./util/maybe";
import withBluefish from "./withBluefish";
import Rect from "./rect";

export type BackgroundProps = ParentProps<
  {
    name: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    background?: () => JSX.Element;
  } & JSX.RectSVGAttributes<SVGRectElement>
>;

export const Background = withBluefish(
  (props: BackgroundProps) => {
    props = mergeProps(
      {
        padding: 5,
        stroke: "black",
        fill: "none",
        "stroke-width": 3,
      },
      props
    );

    const [_, rectProps] = splitProps(props, ["padding"]);

    const layout = (childIds: ChildNode[]) => {
      // debugger;
      childIds = Array.from(childIds);

      if (props.name.endsWith("DEBUG")) {
        debugger;
      }

      const [backgroundChild, ...rest] = childIds;

      let left: number;
      let top: number;
      if (!backgroundChild.owned.left) {
        // infer x from rest

        const lefts = rest.filter((childNode) => childNode.owned.left).map((childNode) => childNode.bbox.left);

        const x = lefts.length === 0 ? 0 : maybeMin(lefts) ?? 0;
        left = x - props.padding!;
        backgroundChild.bbox.left = left;
      } else {
        throw new Error("Background x must be inferred from children");
      }
      if (!backgroundChild.owned.top) {
        // infer y from rest
        const tops = rest.filter((childNode) => childNode.owned.top).map((childNode) => childNode.bbox.top);

        const y = tops.length === 0 ? 0 : maybeMin(tops) ?? 0;
        top = y - props.padding!;
        backgroundChild.bbox.top = top;
      } else {
        throw new Error("Background y must be inferred from children");
      }

      if (!backgroundChild.owned.width) {
        // infer width from rest
        const rights = rest
          .filter((childNode) => childNode.owned.left && childNode.owned.width)
          .map((childNode) => maybeAdd(childNode.bbox.left, childNode.bbox.width));

        const right = rights.length === 0 ? undefined : maybeMax(rights);

        const widths = rest.map((childNode) => childNode.bbox.width);

        const width = maybeSub(right, left + props.padding!) ?? (widths.length === 0 ? 0 : maybeMax(widths) ?? 0);

        backgroundChild.bbox.width = width + 2 * props.padding!;
      }

      // center all children horizontally in the background
      for (const childId of rest) {
        if (childId.owned.left) continue;
        childId.bbox.left = left + (backgroundChild.bbox.width! - childId.bbox.width!) / 2;
      }

      if (!backgroundChild.owned.height) {
        // infer height from rest
        const bottoms = rest
          .filter((childNode) => childNode.owned.top && childNode.owned.height)
          .map((childNode) => maybeAdd(childNode.bbox.top, childNode.bbox.height));

        const bottom = bottoms.length === 0 ? undefined : maybeMax(bottoms);

        const heights = rest.map((childNode) => childNode.bbox.height);

        const height = maybeSub(bottom, top + props.padding!) ?? (heights.length === 0 ? 0 : maybeMax(heights) ?? 0);

        backgroundChild.bbox.height = height + 2 * props.padding!;
      }

      // center all children vertically in the background
      for (const childId of rest) {
        if (childId.owned.top) continue;
        childId.bbox.top = top + (backgroundChild.bbox.height! - childId.bbox.height!) / 2;
      }

      return {
        bbox: {
          left,
          top,
          width: backgroundChild.bbox.width,
          height: backgroundChild.bbox.height,
        },
        transform: {
          translate: {
            x: maybeSub(props.x, left),
            y: maybeSub(props.y, top),
          },
        },
      };
    };

    const paint = (paintProps: { bbox: BBox; transform: Transform; children: JSX.Element }) => {
      return (
        <g transform={`translate(${paintProps.transform.translate.x ?? 0}, ${paintProps.transform.translate.y ?? 0})`}>
          {paintProps.children}
        </g>
      );
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        <Show when={props.background !== undefined} fallback={<Rect {...rectProps} />}>
          {props.background!()}
        </Show>
        {props.children}
      </Layout>
    );
  },
  { displayName: "Background" }
);

export default Background;
