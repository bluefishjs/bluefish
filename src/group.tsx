import { JSX, ParentProps } from "solid-js";
import { BBox, Id, Transform, useScenegraph } from "./scenegraph";
import Layout from "./layout";
import {
  maxOfMaybes,
  maybeAdd,
  maybeMax,
  maybeMin,
  maybeSub,
  minOfMaybes,
} from "./maybeUtil";
import { startsWith } from "lodash";

export type GroupProps = ParentProps<{
  id: Id;
  x?: number;
  y?: number;
}>;

export function Group(props: GroupProps) {
  const { getBBox } = useScenegraph();

  // NOTE: unlike other layout functions. this one determines its bbox by *skipping* undefined
  // values.
  // this is to ensure that if some child of the group doesn't know all its dimensions, then we
  // ignore that.
  // COMBAK: I'm not sure this is the correct behavior in general...
  const layout = (childIds: Id[]) => {
    childIds = Array.from(childIds);

    const bboxes = {
      left: childIds.map((childId) => getBBox(childId).left),
      top: childIds.map((childId) => getBBox(childId).top),
      width: childIds.map((childId) => getBBox(childId).width),
      height: childIds.map((childId) => getBBox(childId).height),
    };

    // const left = maybeMin(bboxes.left);
    const left = minOfMaybes(bboxes.left);

    // const right = maybeMax(
    //   bboxes.left.map((left, i) => maybeAdd(left, bboxes.width[i]))
    // );
    const right = maxOfMaybes(
      bboxes.left.map((left, i) => maybeAdd(left, bboxes.width[i]))
    );

    // const top = maybeMin(bboxes.top);
    const top = minOfMaybes(bboxes.top);

    // const bottom = maybeMax(
    //   bboxes.top.map((top, i) => maybeAdd(top, bboxes.height[i]))
    // );
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
      bbox: { left, top, right, bottom, width, height },
    };
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
    <Layout id={props.id} layout={layout} paint={paint}>
      {props.children}
    </Layout>
  );
}

export default Group;
