import { JSX, ParentProps, splitProps } from "solid-js";
import { BBox, ChildNode, Id, Transform } from "./scenegraph";
import Layout from "./layout";
import {
  maxOfMaybes,
  maybeAdd,
  maybeSub,
  minOfMaybes,
} from "./util/maybe";
import withBluefish from "./withBluefish";

export type GroupProps = Omit<JSX.CircleSVGAttributes<SVGGElement>, "transform"> & ParentProps<{
  name: Id;
  x?: number;
  y?: number;
  rels?: () => JSX.Element;
}>;

export const Group = withBluefish(
  (props: GroupProps) => {
    // NOTE: unlike other layout functions. this one determines its bbox by *skipping* undefined
    // values.
    // this is to ensure that if some child of the group doesn't know all its dimensions, then we
    // ignore that.
    // COMBAK: I'm not sure this is the correct behavior in general...
    const layout = (childNodes: ChildNode[]) => {
      if (props.name.endsWith("DEBUG")) {
        debugger;
      }

      for (const childNode of childNodes) {
        if (!childNode.owned.left) {
          childNode.bbox.left = 0;
        }

        if (!childNode.owned.top) {
          childNode.bbox.top = 0;
        }
      }

      const bboxes = {
        left: childNodes.map((childNode) => childNode.bbox.left),
        top: childNodes.map((childNode) => childNode.bbox.top),
        width: childNodes.map((childNode) => childNode.bbox.width),
        height: childNodes.map((childNode) => childNode.bbox.height),
      };

      const left = minOfMaybes(bboxes.left) ?? 0;

      const right = maxOfMaybes(
        bboxes.left.map((left, i) => maybeAdd(left, bboxes.width[i]))
      );

      const top = minOfMaybes(bboxes.top) ?? 0;

      const bottom = maxOfMaybes(
        bboxes.top.map((top, i) => maybeAdd(top, bboxes.height[i]))
      );

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
      };
    };

    const paint = (paintProps: {
      bbox: BBox;
      transform: Transform;
      children: JSX.Element;
    }) => {
      const [_, rest] = splitProps(props, ["name", "x", "y", "rels"]);

      return (
        <g
          {...rest}
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
        {props.rels?.() ?? null}
      </Layout>
    );
  },
  { displayName: "Group" }
);

export default Group;
